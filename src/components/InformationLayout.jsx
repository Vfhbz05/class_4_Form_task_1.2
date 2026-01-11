import PropTypes from 'prop-types';
import styles from './Information.module.css';

export const InformationLayout = ({status, currentPlayer})=>{
	const getStatusClassName = () => {
		if (status.includes('Победил')) {
      return styles.win;
    }
    
    if (status.includes('Ничья')) {
      return styles.draw;
    }

    return currentPlayer === 'X' ? styles.statusX : styles.statusO;
	} 
	return (
		<div className = {`${styles.info} ${getStatusClassName()}`}>
			{status}
		</div>
	);
};

InformationLayout.PropTypes = {
	status: PropTypes.string,
	currentPlayer: PropTypes.string,
}
