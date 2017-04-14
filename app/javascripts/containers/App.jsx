import React, { PropTypes } from 'react';
import lanesActions from '../actions/lanes';
import notesActions from '../actions/notes';
import { connect } from 'react-redux';
import Lanes from '../components/Lanes.jsx';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class App extends React.Component {
  constructor() {
    super();
    this.handleCreateNote = this.handleCreateNote.bind(this);
  }

  handleCreateNote(inputText) {
    this.props.onCreateNote(this.props.lanes[0].id, inputText);
  }

  render() {
      let input;
      var sum = 0; 
      this.props.lanes.forEach(lane => sum += lane.notes.length);
    return (
      <div className="react-kanban">
        <h1 className="app-title">React.js Kanban</h1>
        <button
          className="add-lane"
          onClick={this.props.onCreateLane}
        >
          + Lane
        </button>
        <form onSubmit={e => {
            e.preventDefault()
            if (!input.value.trim()) {
                return
            }
            this.handleCreateNote(input.value.trim());
            input.value = ''
        }}>
        <button type="submit">
        Add Project
        </button>
        <input ref={node => {
            input = node
        }} />
        </form>
        <button
          className="reset-store"
          onClick={this.props.onReset}
        >
          Reset persisted store
        </button>
            <h3 className="totalProject">
            Total {sum} Projects
            </h3>
        <Lanes
          lanes={this.props.lanes}
          onEditLane={this.props.onEditLane}
          onDeleteLane={this.props.onDeleteLane}
          onMoveLane={this.props.onMoveLane}
          onSortLane={this.props.onSortLane}
        />
      </div>
    );
  }
}

App.propTypes = {
  lanes: PropTypes.array.isRequired,
  onCreateLane: PropTypes.func.isRequired,
  onDeleteLane: PropTypes.func.isRequired,
  onEditLane: PropTypes.func.isRequired,
  onMoveLane: PropTypes.func.isRequired,
  onSortLane: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lanes: state.lanes,
});

const mapDispatchToProps = (dispatch) => ({
  onCreateLane() {
    dispatch(lanesActions.createLane('Active'));
  },

  onCreateNote(laneId, text) {
    const newNote = notesActions.createNote(text);
    dispatch(newNote);
    dispatch(lanesActions.attachToLane(laneId, newNote.payload.id));
  },

  onEditLane(laneId, name) {
    const updatedLane = {
      id: laneId,
    };

    if(name) {
      updatedLane.name = name;
      updatedLane.editing = false;
    } else {
      updatedLane.editing = true;
    }

    dispatch(lanesActions.updateLane(updatedLane));
  },

  onSortLane(laneId) {
    dispatch(lanesActions.sortLane(laneId));
  },

  onDeleteLane(laneId) {
    dispatch(lanesActions.deleteLane(laneId));
  },

  onMoveLane(sourceId, targetId) {
    dispatch(lanesActions.move('lane', sourceId, targetId));
  },
});

export default DragDropContext(HTML5Backend)(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
