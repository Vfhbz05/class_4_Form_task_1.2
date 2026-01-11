import PropTypes from 'prop-types';
import styles from './App.module.css';

export const AppLayout = ({information, field, onClickRestart}) =>{
	return(
		<div className = {styles.game}>
			<h1 className= {styles.title}>Крестики-нолики</h1>
			<div className = {styles.container}>
				{information}
				{field}
				<button className= {styles.restartBtn} onClick = {onClickRestart}>
					Начать заново</button>
			</div>
		</div>
	);
};

AppLayout.propTypes = {
	information: PropTypes.node,
	field: PropTypes.node,
	onClickRestart: PropTypes.func,
}
