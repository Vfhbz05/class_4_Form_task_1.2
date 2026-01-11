import PropTypes from 'prop-types';
import { FieldLayout } from './FieldLayout';

export const Field = ({field, onClickToCell}) =>{
	return (
		<FieldLayout field = {field} onClickToCell= {onClickToCell}/>
	)
}

