# Generated by Django 5.1.4 on 2025-01-08 07:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('taskapp', '0002_remove_task_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('completed', 'Completed')], max_length=50),
        ),
    ]
