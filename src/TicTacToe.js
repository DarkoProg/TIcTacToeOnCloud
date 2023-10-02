
import './styles/TicTacToe.css';
import Field from './Field.js';

const TikTacToe = () => {
  return (  
    <div className="tic_tac_toe">
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map(id => (
            <Field />
            ))
        }
    </div>
  );
}
 
export default TikTacToe;