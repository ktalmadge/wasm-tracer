import React from 'react';

class Scenes extends React.Component {
  constructor(props) {
    super(props);

    this.loadScene = this.loadScene.bind(this);
  }

  loadScene(scene) {
    return ((event) => {
      this.props.loadScene(scene);
    });
  }

  static availableScenes() {
    return [
        'Spheres',
        'Cow',
        'Monkey',
        'Bunny',
        'MINI'
    ]
  }

  render() {
    let selected = this.props.selected_tab === 'load';
    return (
        <div className={"configuration scene-configuration " + (selected ? "selected" : "")} >
          <div className="scene-options">
            <div className="configuration-title">Select a scene to load</div>
            <div className="available-scenes">
              {Scenes.availableScenes().map(scene => (
                  <button onClick={this.loadScene(scene)} key={"load-" + scene + "-button"}>{scene}</button>
              ))}
            </div>
          </div>
        </div>
    )
  }
}

export default Scenes;