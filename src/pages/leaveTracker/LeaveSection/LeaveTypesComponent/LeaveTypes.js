
import React from 'react';
import './LeaveTypes.css';

const LeaveTypes = ({ leaves }) => {
  return (
    <div className="leave-types">
      {leaves.map((leave, index) => (
        <div className="leave-box" key={index}>
          <h2>{leave.type}</h2>
          <img src={leave.icon} width={50} alt={`${leave.type} icon`} /> {/* Use leave.icon */}
          <p>Available: {leave.available !== undefined ? leave.available : '-'}</p>
          <p>Booked: {leave.booked}</p>
        </div>
      ))}
    </div>
  );
};

export default LeaveTypes;










// import React from 'react';
// import './LeaveTypes.css';


// const LeaveTypes = ({ leaves }) => {
//   return (
//     <div className="leave-types">
//       {leaves.map((leave, index) => (
//         <div className="leave-box" key={index}>
//           <h2>{leave.type}</h2>
//           <img src={leave.icon} width={50}/>
//           <p>Available: {leave.available}</p>
//           <p>Booked: {leave.booked}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LeaveTypes;
