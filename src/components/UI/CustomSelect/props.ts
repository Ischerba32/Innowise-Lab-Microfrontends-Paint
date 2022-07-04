import { SingleValue } from 'react-select';

import { Tools } from '../../../interfaces/hooks/useDraw.interface';

export interface OptionParams {
	value: string | Tools;
	label: string;
}

export interface CustomSelectProps {
	onChange: (newValue: SingleValue<string | OptionParams>) => void;
	options: OptionParams[];
}
