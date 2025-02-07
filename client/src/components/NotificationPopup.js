// import React, { useState } from 'react';
// import { useNotifications } from './Notifications';

// const NotificationBell = () => {
//   const { notifications } = useNotifications();
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className='notification-bell'>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         style={{
//           position: 'relative',
//           background: 'transparent',
//           border: 'none',
//           cursor: 'pointer',
//         }}
//       >
//         🛎️
//         {notifications.length > 0 && (
//           <span
//             style={{
//               position: 'absolute',
//               top: '-5px',
//               right: '-5px',
//               background: 'red',
//               color: 'white',
//               borderRadius: '50%',
//               padding: '5px',
//               fontSize: '10px',
//             }}
//           >
//             {notifications.length}
//           </span>
//         )}
//       </button>

//       {isOpen && <NotificationPopup />}
//     </div>
//   );
// };

// export default NotificationBell;
