import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
  render() {
    const emotions = this.props.emotions.result.emotion.document.emotion;
    //console.log(emotions);
    const resultKeys = Object.keys(
      this.props.emotions.result.emotion.document.emotion
    );
      return (  
        <div>
          {/*You can remove this line and the line below. */}
          {/*JSON.stringify(this.props.emotions)*/}
          <table className="table table-bordered">
            <tbody>
            {
                //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions
                resultKeys.map((key, index) => {
                  return (
                    <tr key={index}>
                      <td>{key}</td>
                      <td>{emotions[key]}</td>
                    </tr>
                  );
                })
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
