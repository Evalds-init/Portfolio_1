import React, { useState, Fragment, useEffect , useContext} from 'react';
import EditDetails from './EditDetails';
import DisplayDetails from './DisplayDetails';
import AuthContext from '../../../context/auth/authContext';
function PersonalDetails() {
  const authContext = useContext(AuthContext);
  const { updateDetails } = authContext;
  const [edit, setEdit] = useState(false);
  const onClick = (e) => {
    e.preventDefault();
    setEdit(!edit);
  };
  useEffect(() => {
    setEdit(false);
  }, [updateDetails]);
  return (
    <Fragment>
      {edit ? <EditDetails /> : <DisplayDetails />}
      <div>
        {' '}
        {!edit && (
          <button
            className="btn waves-effect waves-light light-blue"
            type="submit"
            name="action"
            onClick={onClick}
          >
            Edit
            <i className="material-icons right">edit</i>
          </button>
        )}
      </div>
    </Fragment>
  );
}

export default PersonalDetails;
