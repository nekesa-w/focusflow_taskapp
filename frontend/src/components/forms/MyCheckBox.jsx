import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function MyCheckBox() {
	return (
		<FormGroup>
			<FormControlLabel
				control={
					<Checkbox
						{...label}
						defaultChecked
						sx={{
							color: pink[800],
							"&.Mui-checked": {
								color: pink[600],
							},
						}}
					/>
				}
				label="Label"
			/>
		</FormGroup>
	);
}
