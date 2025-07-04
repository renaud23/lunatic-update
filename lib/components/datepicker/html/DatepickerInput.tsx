import { type ChangeEventHandler } from 'react';
import classnames from 'classnames';

export type Props = {
	labelId: string;
	id?: string;
	disabled?: boolean;
	readOnly?: boolean;
	value?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	min?: string;
	max?: string;
	invalid?: boolean;
};

function DatepickerInput({
	id,
	disabled,
	readOnly,
	labelId,
	value,
	onChange,
	min,
	max,
	invalid,
}: Props) {
	return (
		<input
			id={id}
			className={classnames('lunatic-datepicker', { disabled, readOnly })}
			type="date"
			aria-labelledby={labelId}
			readOnly={readOnly}
			disabled={disabled}
			value={value}
			onChange={onChange}
			min={min}
			max={max}
			aria-invalid={invalid}
		/>
	);
}

export default DatepickerInput;
