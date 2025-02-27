// import React, { useState, useEffect } from 'react';
// import { Calendar, AlertCircle, Plus, Edit2, Trash2 } from 'lucide-react';
// import { Alert, AlertDescription } from './components/ui/alert';

// const PRODUCTION_APP_ID = 'sq0idp-LxFBW4bk1zUAh0SVFnPaCA';
// const PRODUCTION_ACCESS_TOKEN = 'sq0csp-zfcQyFr97czgKHK3Y59UtyD9o5rAjxM_xm-cAwn-5cI';

// const SquareCalendar = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [accessToken, setAccessToken] = useState('');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [locations, setLocations] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [services, setServices] = useState([]);
//   const [teamMembers, setTeamMembers] = useState([]);

//   useEffect(() => {
//     // Check for OAuth callback
//     const urlParams = new URLSearchParams(window.location.search);
//     const authCode = urlParams.get('code');

//     if (authCode) {
//       handleOAuthCallback(authCode);
//     } else if (window.location.pathname === '/callback') {
//       // If we're on the callback page but no code, show error
//       setError('No authorization code received');
//       setLoading(false);
//     } else {
//       // Only initialize calendar if we're not on the callback page
//       initializeCalendar();
//     }
//   }, []);

//   const initializeCalendar = async () => {
//     // Check for stored token
//     const storedToken = localStorage.getItem('square_access_token');
//     if (storedToken) {
//       setAccessToken(storedToken);
//       try {
//         await fetchLocations();
//         await fetchServices();
//         await fetchTeamMembers();
//         await fetchAppointments();
//       } catch (err) {
//         setError('Failed to initialize calendar');
//         // If we get an authorization error, clear the stored token
//         if (err.message === 'Unauthorized') {
//           localStorage.removeItem('square_access_token');
//           setAccessToken('');
//         }
//       }
//     }
//     setLoading(false);
//   };
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-lg">Loading calendar data...</div>
//       </div>
//     );
//   }

//   if (!accessToken) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="max-w-md w-full p-6">
//           <Alert>
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription>
//               Please authenticate with Square first.
//               <a
//                 href={`https://connect.squareup.com/oauth2/authorize?client_id=${PRODUCTION_APP_ID}&scope=APPOINTMENTS_READ APPOINTMENTS_WRITE CUSTOMERS_READ CUSTOMERS_WRITE&redirect_uri=${encodeURIComponent(window.location.origin + '/callback')}`}
//                 className="ml-2 text-blue-600 hover:text-blue-800"
//               >
//                 Connect with Square
//               </a>
//             </AlertDescription>
//           </Alert>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       {error && (
//         <Alert className="mb-4">
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-3xl font-bold text-gray-900">Appointments Calendar</h1>
//         <div className="flex space-x-4">
//           <select
//             className="border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             value={selectedLocation}
//             onChange={(e) => {
//               setSelectedLocation(e.target.value);
//               fetchAppointments();
//             }}
//           >
//             {locations.map(location => (
//               <option key={location.id} value={location.id}>
//                 {location.name}
//               </option>
//             ))}
//           </select>
//           <button
//             onClick={() => createAppointment({})}
//             className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             <Plus className="h-4 w-4 mr-2" />
//             New Appointment
//           </button>
//         </div>
//       </div>

//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <div className="divide-y divide-gray-200">
//           {appointments.map(appointment => (
//             <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <Calendar className="h-5 w-5 text-gray-400" />
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-900">
//                       Appointment {appointment.id}
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       {new Date(appointment.start_at).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => updateAppointment(appointment.id, appointment)}
//                     className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"
//                     title="Edit appointment"
//                   >
//                     <Edit2 className="h-5 w-5" />
//                   </button>
//                   <button
//                     onClick={() => deleteAppointment(appointment.id)}
//                     className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"
//                     title="Cancel appointment"
//                   >
//                     <Trash2 className="h-5 w-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//           {appointments.length === 0 && (
//             <div className="p-6 text-center text-gray-500">
//               No appointments found. Create one to get started.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SquareCalendar;
