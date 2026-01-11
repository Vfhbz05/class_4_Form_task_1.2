import PropTypes from 'prop-types';
import styles from './Field.module.css';

export const FieldLayout = ({field, onClickToCell})=>{
	return(
		<div className={styles.field}>
			{field.map((el, index)=>(
				<button className= {`${styles.el} ${el === 'X' ? styles.x : ''} ${el === 'O' ? styles.o : ''}`} key = {index} onClick = {() => onClickToCell(index)}>
					{el}
				</button>
			))}
		</div>
	);
};

FieldLayout.propTypes = {
field: PropTypes.array,
onClickToCell: PropTypes.func,
}
