// // SprintDashboard.js

// import React from 'react';
// import SprintDetails from '../SprintDetails';
// import Navbar from '../Navbar';
// import './../../css/sprint-css.css';
// import { useState } from 'react';
// const SprintDashboard = () => {

//     const [sprints, setSprints] = useState(
//         [
//             { id: 1, startDate: '2024-02-01', status: 'Completed', endDate: '2024-02-14' },
//             { id: 2, startDate: '2024-02-15', endDate: '2024-02-28' },
//             { id: 3, startDate: '2024-02-15', endDate: '2024-02-28' },
//             { id: 4, startDate: '2024-02-15', endDate: '2024-02-28' },
//             { id: 5, startDate: '2024-02-15', endDate: '2024-02-28' },
//             { id: 6, startDate: '2024-02-15', endDate: '2024-02-28' },
//             { id: 7, startDate: '2024-02-15', endDate: '2024-02-28' },
//             { id: 8, startDate: '2024-02-15', endDate: '2024-02-28' },
//         ]
//     )
//     const [showModal, setShowModal] = useState(false);
//     const [startDate, setStartDate] = useState('');
//     const [duration, setDuration] = useState('');

//     const handleCreateSprint = () => {
//         setShowModal(true);
//     };

//     const handleSaveSprint = () => {

//         const sprint_index = sprints.length + 1;
//         setSprints([...sprints, { id: sprint_index, startDate: startDate, duration: duration }]);
//         // Close the modal after saving
//         setShowModal(false);
//     };

//     const handleCloseModal = () => {
//         setShowModal(false);
//     };


//     return (
//         <div className='sprint-dashboard'>
//             <Navbar active="projects" />
//             <h1>Sprint Dashboard</h1>
//             <div>
//                 {sprints.map(sprint => (
//                     <SprintDetails key={sprint.id} sprint={sprint} />
//                 ))}
//             </div>
//             <div>
//                 <button className="btn btn-primary" onClick={handleCreateSprint}>
//                     Create Sprint
//                 </button>
//                 {showModal && (
//                     <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
//                         <div className="modal-dialog" role="document">
//                             <div className="modal-content">
//                                 <div className="modal-header">
//                                     <h5 className="modal-title">Create Sprint</h5>
//                                     {/* <button type="button" className="close" onClick={handleCloseModal}>
//                                         <span>&times;</span>
//                                     </button> */}
//                                 </div>
//                                 <div className="modal-body text-left">

//                                     <div className="form-group mb-3">
//                                         <label htmlFor="startDate" className='mb-2'>Start Date</label>
//                                         <input
//                                             type="date"
//                                             className="form-control"
//                                             id="startDate"
//                                             value={startDate}
//                                             onChange={(e) => setStartDate(e.target.value)}
//                                         />
//                                     </div>
//                                     <div className="form-group mb-3">
//                                         <label htmlFor="duration" className='mb-2'>Duration (in weeks)</label>
//                                         <input
//                                             type="number"
//                                             className="form-control"
//                                             id="duration"
//                                             value={duration}
//                                             onChange={(e) => setDuration(e.target.value)}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="modal-footer">
//                                     <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
//                                         Close
//                                     </button>
//                                     <button type="button" className="btn btn-primary" onClick={handleSaveSprint}>
//                                         Save
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>


//         </div>

//     );
// }



// export default SprintDashboard;
