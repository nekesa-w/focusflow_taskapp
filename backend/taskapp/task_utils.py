import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
import random
import re

checkpoint = "HuggingFaceTB/SmolLM2-135M-Instruct"
device = "cpu"

tokenizer = AutoTokenizer.from_pretrained(checkpoint)
model = AutoModelForCausalLM.from_pretrained(checkpoint).to(device)

tokenizer.pad_token = tokenizer.eos_token


def generate_subtasks(task_title, num_subtasks, detail_level):
    if detail_level == "low":
        detail_instruction = "Each subtask should be fewer than 5 words."
    elif detail_level == "high":
        detail_instruction = "Each subtask should be between 20 to 30 words."

    prompt = (
        f"You are a task planner. Break down the following task into exactly {num_subtasks} clear and actionable steps. "
        f"{detail_instruction} Each subtask should be practical, specific, and easy to follow. The subtasks should be ordered logically and focus on accomplishing the task in a methodical way. "
        "Avoid any filler, general explanations, or placeholders. The goal is for someone to be able to follow these steps and complete the task without needing further clarification.\n\n"
        f"Task: {task_title}\n\n"
        "Subtasks:"
    )

    tokenizer.pad_token = tokenizer.eos_token

    with torch.no_grad():
        inputs = tokenizer(
            prompt, return_tensors="pt", padding=True, truncation=True
        ).to(model.device)

        outputs = model.generate(
            **inputs,
            num_return_sequences=1,
            pad_token_id=tokenizer.eos_token_id,
            no_repeat_ngram_size=2,
            num_beams=1,
            early_stopping=True,
            max_new_tokens=256,
        )

    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

    subtasks_section = generated_text.split("Subtasks:", 1)[-1].strip()
    subtasks_section = re.sub(r"^\d+\.\s*", "", subtasks_section, flags=re.MULTILINE)

    subtasks_list = [
        sentence.strip() + "."
        for sentence in re.split(r"[.\n]", subtasks_section)
        if sentence.strip()
    ]

    subtasks = subtasks_list[:num_subtasks]

    while len(subtasks) < num_subtasks:
        subtasks.append("Do remaining tasks")

    if detail_level == "high":
        subtasks[-1] = "Do remaining tasks"

    if num_subtasks > 5:
        subtasks[-1] = "Do remaining tasks"

    motivational_words_first = [
        "to begin the journey",
        "to set the pace",
        "to take the first step",
        "to move forward",
        "to start strong",
        "to kick things off",
        "to begin today",
        "to make your first move",
        "to set things in motion",
        "to start progress",
        "to take the first action",
        "to begin the climb",
        "to get moving",
        "to start your path",
        "to lay the foundation",
        "to take the first leap",
        "to make the first change",
        "to start the first phase",
        "to make the first mark",
    ]

    motivational_words_middle = [
        "to keep the momentum going",
        "to stay on track",
        "to push through",
        "to maintain your focus",
        "to keep moving forward",
        "to stay committed",
        "to keep progressing",
        "to keep up the good work",
        "to build on your success",
        "to keep up the pace",
        "to get closer to your goal",
        "to stay determined",
        "to keep climbing",
        "to stay in the game",
    ]

    motivational_words_last = [
        "and finish strong",
        "to complete the journey",
        "and celebrate your success",
        "to reach your goal",
        "and take pride in your achievement",
        "to close the chapter",
        "and see your hard work pay off",
        "and savor the victory",
        "to seal the deal",
        "and end on a high note",
        "to finish what you started",
        "and reap the rewards",
        "to cross the finish line",
        "and be proud of the result",
        "to end with impact",
        "and complete the mission",
        "to wrap it all up",
    ]

    for i, subtask in enumerate(subtasks):
        if i == 0:
            subtasks[i] = (
                subtask.rstrip(".") + " " + random.choice(motivational_words_first)
            )
        elif i == len(subtasks) - 1:
            subtasks[i] = (
                subtask.rstrip(".") + " " + random.choice(motivational_words_last)
            )
        else:
            subtasks[i] = (
                subtask.rstrip(".") + " " + random.choice(motivational_words_middle)
            )

    return subtasks
