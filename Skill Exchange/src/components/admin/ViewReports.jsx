// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { format } from 'date-fns';
// // import {
// //   Box,
// //   Card,
// //   CardContent,
// //   Typography,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TablePagination,
// //   TextField,
// //   MenuItem,
// //   Chip,
// //   Paper,
// //   Grid,
// //   IconButton,
// //   Tooltip,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogContentText,
// //   DialogActions,
// //   Button
// // } from '@mui/material';
// // import SearchIcon from '@mui/icons-material/Search';
// // import FilterAltIcon from '@mui/icons-material/FilterAlt';
// // import VisibilityIcon from '@mui/icons-material/Visibility';
// // import CloseIcon from '@mui/icons-material/Close';

// // const ViewReports = () => {
// //   const [reports, setReports] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(10);
// //   const [filters, setFilters] = useState({
// //     subject: '',
// //     search: '',
// //     startDate: null,
// //     endDate: null
// //   });
// //   const [openDialog, setOpenDialog] = useState(false);
// //   const [selectedReport, setSelectedReport] = useState(null);

// //   useEffect(() => {
// //     fetchReports();
// //   }, [filters]);

// //   const fetchReports = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await axios.get('/reports/view');
// //       setReports(response.data.data);
// //     } catch (error) {
// //       console.error('Error fetching reports:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleChangePage = (event, newPage) => {
// //     setPage(newPage);
// //   };

// //   const handleChangeRowsPerPage = (event) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0);
// //   };

// //   const handleFilterChange = (name, value) => {
// //     setFilters({
// //       ...filters,
// //       [name]: value
// //     });
// //     setPage(0);
// //   };

// //   const handleOpenDialog = (report) => {
// //     setSelectedReport(report);
// //     setOpenDialog(true);
// //   };

// //   const handleCloseDialog = () => {
// //     setOpenDialog(false);
// //     setSelectedReport(null);
// //   };

// //   const filteredReports = reports.filter(report => {
// //     return (
// //       (filters.subject === '' || report.subject === filters.subject) &&
// //       (filters.search === '' ||
// //         report.name.toLowerCase().includes(filters.search.toLowerCase()) ||
// //         report.email.toLowerCase().includes(filters.search.toLowerCase()) ||
// //         (report.username && report.username.toLowerCase().includes(filters.search.toLowerCase())) ||
// //         report.message.toLowerCase().includes(filters.search.toLowerCase())) &&
// //       (!filters.startDate || new Date(report.createdAt) >= new Date(filters.startDate)) &&
// //       (!filters.endDate || new Date(report.createdAt) <= new Date(filters.endDate))
// //     );
// //   });

// //   const getSubjectColor = (subject) => {
// //     switch (subject) {
// //       case 'report-user': return 'error';
// //       case 'bug-report': return 'warning';
// //       case 'other': return 'success';
// //       default: return 'primary';
// //     }
// //   };

// //   return (
// //     <Box sx={{ p: 3 }}>
// //       <Card>
// //         <CardContent>
// //           <Typography variant="h4" gutterBottom>
// //             Reports Management
// //           </Typography>

// //           <Grid container spacing={2} sx={{ mb: 3 }}>
// //             <Grid item xs={12} sm={6} md={3}>
// //               <TextField
// //                 select
// //                 fullWidth
// //                 label="Subject"
// //                 value={filters.subject}
// //                 onChange={(e) => handleFilterChange('subject', e.target.value)}
// //                 InputProps={{
// //                   startAdornment: <FilterAltIcon color="action" sx={{ mr: 1 }} />
// //                 }}
// //               >
// //                 <MenuItem value="">All Subjects</MenuItem>
// //                 <MenuItem value="report-user">Report User</MenuItem>
// //                 <MenuItem value="bug-report">Bug Report</MenuItem>
// //                 <MenuItem value="general-inquiry">General Inquiry</MenuItem>
// //                 <MenuItem value="other">Other</MenuItem>
// //               </TextField>
// //             </Grid>
// //             <Grid item xs={12} sm={6} md={3}>
// //               <TextField
// //                 fullWidth
// //                 label="Start Date"
// //                 type="date"
// //                 InputLabelProps={{ shrink: true }}
// //                 value={filters.startDate || ''}
// //                 onChange={(e) => handleFilterChange('startDate', e.target.value)}
// //               />
// //             </Grid>
// //             <Grid item xs={12} sm={6} md={3}>
// //               <TextField
// //                 fullWidth
// //                 label="End Date"
// //                 type="date"
// //                 InputLabelProps={{ shrink: true }}
// //                 value={filters.endDate || ''}
// //                 onChange={(e) => handleFilterChange('endDate', e.target.value)}
// //               />
// //             </Grid>
// //             <Grid item xs={12} sm={6} md={3}>
// //               <TextField
// //                 fullWidth
// //                 label="Search"
// //                 value={filters.search}
// //                 onChange={(e) => handleFilterChange('search', e.target.value)}
// //                 InputProps={{
// //                   endAdornment: (
// //                     <IconButton>
// //                       <SearchIcon />
// //                     </IconButton>
// //                   )
// //                 }}
// //               />
// //             </Grid>
// //           </Grid>

// //           <TableContainer component={Paper}>
// //             <Table sx={{ minWidth: 650 }} aria-label="reports table">
// //               <TableHead>
// //                 <TableRow>
// //                   <TableCell>Name</TableCell>
// //                   <TableCell>Email</TableCell>
// //                   <TableCell>Subject</TableCell>
// //                   <TableCell>Custom Subject</TableCell>
// //                   <TableCell>Reported User</TableCell>
// //                   <TableCell>Reporter ID</TableCell>
// //                   <TableCell>Date</TableCell>
// //                   <TableCell>Action</TableCell>
// //                 </TableRow>
// //               </TableHead>
// //               <TableBody>
// //                 {filteredReports
// //                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
// //                   .map((report) => (
// //                     <TableRow key={report._id}>
// //                       <TableCell>{report.name}</TableCell>
// //                       <TableCell>{report.email}</TableCell>
// //                       <TableCell>
// //                         <Chip
// //                           label={report.subject.toUpperCase()}
// //                           color={getSubjectColor(report.subject)}
// //                           size="small"
// //                         />
// //                       </TableCell>
// //                       <TableCell>{report.customSubject || 'N/A'}</TableCell>
// //                       <TableCell>
// //                         <Box sx={{ display: 'flex', gap: 1 }}>
// //                           {report.username && <Chip label={report.username} size="small" />}
// //                           {report.reportedUserId && (
// //                             <Chip
// //                               label={`ID: ${typeof report.reportedUserId === 'object'
// //                                 ? report.reportedUserId._id
// //                                 : report.reportedUserId}`}
// //                               color="secondary"
// //                               size="small"
// //                             />
// //                           )}
// //                         </Box>
// //                       </TableCell>
// //                       <TableCell>
// //                         {report.reporterUserId
// //                           ? (typeof report.reporterUserId === 'object'
// //                             ? report.reporterUserId._id || report.reporterUserId.userName
// //                             : report.reporterUserId)
// //                           : 'Guest'}
// //                       </TableCell>
// //                       <TableCell>{format(new Date(report.createdAt), 'yyyy-MM-dd HH:mm')}</TableCell>
// //                       <TableCell>
// //                         <Tooltip title="View Details">
// //                           <IconButton onClick={() => handleOpenDialog(report)}>
// //                             <VisibilityIcon color="primary" />
// //                           </IconButton>
// //                         </Tooltip>
// //                       </TableCell>
// //                     </TableRow>
// //                   ))}
// //               </TableBody>
// //             </Table>
// //           </TableContainer>

// //           <TablePagination
// //             rowsPerPageOptions={[5, 10, 25]}
// //             component="div"
// //             count={filteredReports.length}
// //             rowsPerPage={rowsPerPage}
// //             page={page}
// //             onPageChange={handleChangePage}
// //             onRowsPerPageChange={handleChangeRowsPerPage}
// //           />
// //         </CardContent>
// //       </Card>

// //       {/* Message Dialog */}
// //       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
// //         <DialogTitle>
// //           Report Details
// //           <IconButton
// //             aria-label="close"
// //             onClick={handleCloseDialog}
// //             sx={{
// //               position: 'absolute',
// //               right: 8,
// //               top: 8,
// //               color: (theme) => theme.palette.grey[500],
// //             }}
// //           >
// //             <CloseIcon />
// //           </IconButton>
// //         </DialogTitle>
// //         <DialogContent dividers>
// //           {selectedReport && (
// //             <>
// //               <Box sx={{ mb: 2 }}>
// //                 <Typography variant="subtitle1" gutterBottom>
// //                   <strong>From:</strong> {selectedReport.name} ({selectedReport.email})
// //                 </Typography>
// //                 <Typography variant="subtitle1" gutterBottom>
// //                   <strong>Subject:</strong> {selectedReport.subject}
// //                   {selectedReport.customSubject && ` - ${selectedReport.customSubject}`}
// //                 </Typography>
// //                 <Typography variant="subtitle1" gutterBottom>
// //                   <strong>Date:</strong> {format(new Date(selectedReport.createdAt), 'yyyy-MM-dd HH:mm')}
// //                 </Typography>
// //               </Box>
// //               <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
// //                 <Typography variant="h6" gutterBottom>
// //                   Message:
// //                 </Typography>
// //                 <DialogContentText>
// //                   {selectedReport.message}
// //                 </DialogContentText>
// //               </Box>
// //             </>
// //           )}
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={handleCloseDialog}>Close</Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // };

// // export default ViewReports;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { format } from 'date-fns';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   TextField,
//   MenuItem,
//   Chip,
//   Paper,
//   Grid,
//   IconButton,
//   Tooltip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button,
//   useMediaQuery,
//   useTheme,
//   Stack,
//   Hidden
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import CloseIcon from '@mui/icons-material/Close';

// const ViewReports = () => {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [filters, setFilters] = useState({
//     subject: '',
//     search: '',
//     startDate: null,
//     endDate: null
//   });
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedReport, setSelectedReport] = useState(null);
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

//   useEffect(() => {
//     fetchReports();
//   }, [filters]);

//   const fetchReports = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('/reports/view');
//       setReports(response.data.data);
//     } catch (error) {
//       console.error('Error fetching reports:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleFilterChange = (name, value) => {
//     setFilters({
//       ...filters,
//       [name]: value
//     });
//     setPage(0);
//   };

//   const handleOpenDialog = (report) => {
//     setSelectedReport(report);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedReport(null);
//   };

//   const filteredReports = reports.filter(report => {
//     return (
//       (filters.subject === '' || report.subject === filters.subject) &&
//       (filters.search === '' ||
//         report.name.toLowerCase().includes(filters.search.toLowerCase()) ||
//         report.email.toLowerCase().includes(filters.search.toLowerCase()) ||
//         (report.username && report.username.toLowerCase().includes(filters.search.toLowerCase())) ||
//         report.message.toLowerCase().includes(filters.search.toLowerCase())) &&
//       (!filters.startDate || new Date(report.createdAt) >= new Date(filters.startDate)) &&
//       (!filters.endDate || new Date(report.createdAt) <= new Date(filters.endDate))
//     );
//   });

//   const getSubjectColor = (subject) => {
//     switch (subject) {
//       case 'report-user': return 'error';
//       case 'bug-report': return 'warning';
//       case 'other': return 'success';
//       default: return 'primary';
//     }
//   };

//   return (
//     <Box sx={{ p: { xs: 1, sm: 3 } }}>
//       <Card>
//         <CardContent>
//           <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
//             Reports Management
//           </Typography>

//           <Grid container spacing={2} sx={{ mb: 3 }}>
//             <Grid item xs={12} sm={6} md={3}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Subject"
//                 value={filters.subject}
//                 onChange={(e) => handleFilterChange('subject', e.target.value)}
//                 InputProps={{
//                   startAdornment: <FilterAltIcon color="action" sx={{ mr: 1 }} />
//                 }}
//                 size={isSmallScreen ? 'small' : 'medium'}
//               >
//                 <MenuItem value="">All Subjects</MenuItem>
//                 <MenuItem value="report-user">Report User</MenuItem>
//                 <MenuItem value="bug-report">Bug Report</MenuItem>
//                 <MenuItem value="general-inquiry">General Inquiry</MenuItem>
//                 <MenuItem value="other">Other</MenuItem>
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <TextField
//                 fullWidth
//                 label="Start Date"
//                 type="date"
//                 InputLabelProps={{ shrink: true }}
//                 value={filters.startDate || ''}
//                 onChange={(e) => handleFilterChange('startDate', e.target.value)}
//                 size={isSmallScreen ? 'small' : 'medium'}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <TextField
//                 fullWidth
//                 label="End Date"
//                 type="date"
//                 InputLabelProps={{ shrink: true }}
//                 value={filters.endDate || ''}
//                 onChange={(e) => handleFilterChange('endDate', e.target.value)}
//                 size={isSmallScreen ? 'small' : 'medium'}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <TextField
//                 fullWidth
//                 label="Search"
//                 value={filters.search}
//                 onChange={(e) => handleFilterChange('search', e.target.value)}
//                 InputProps={{
//                   endAdornment: (
//                     <IconButton size={isSmallScreen ? 'small' : 'medium'}>
//                       <SearchIcon fontSize={isSmallScreen ? 'small' : 'medium'} />
//                     </IconButton>
//                   )
//                 }}
//                 size={isSmallScreen ? 'small' : 'medium'}
//               />
//             </Grid>
//           </Grid>

//           {isSmallScreen ? (
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//               {filteredReports
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((report) => (
//                   <Paper key={report._id} sx={{ p: 2 }}>
//                     <Stack spacing={1}>
//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                         <Typography variant="subtitle1" fontWeight="bold">{report.name}</Typography>
//                         <IconButton onClick={() => handleOpenDialog(report)} size="small">
//                           <VisibilityIcon color="primary" fontSize="small" />
//                         </IconButton>
//                       </Box>
//                       <Typography variant="body2" color="text.secondary">{report.email}</Typography>
                      
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <Chip
//                           label={report.subject.toUpperCase()}
//                           color={getSubjectColor(report.subject)}
//                           size="small"
//                         />
//                         {report.customSubject && (
//                           <Typography variant="body2">{report.customSubject}</Typography>
//                         )}
//                       </Box>
                      
//                       {report.username && (
//                         <Box>
//                           <Typography variant="caption" fontWeight="bold">Reported User:</Typography>
//                           <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
//                             <Chip label={report.username} size="small" />
//                             {report.reportedUserId && (
//                               <Chip
//                                 label={`ID: ${typeof report.reportedUserId === 'object'
//                                   ? report.reportedUserId._id
//                                   : report.reportedUserId}`}
//                                 color="secondary"
//                                 size="small"
//                               />
//                             )}
//                           </Box>
//                         </Box>
//                       )}
                      
//                       <Box>
//                         <Typography variant="caption" fontWeight="bold">Reporter:</Typography>
//                         <Typography variant="body2">
//                           {report.reporterUserId
//                             ? (typeof report.reporterUserId === 'object'
//                               ? report.reporterUserId._id || report.reporterUserId.userName
//                               : report.reporterUserId)
//                             : 'Guest'}
//                         </Typography>
//                       </Box>
                      
//                       <Typography variant="caption" color="text.secondary">
//                         {format(new Date(report.createdAt), 'yyyy-MM-dd HH:mm')}
//                       </Typography>
//                     </Stack>
//                   </Paper>
//                 ))}
//             </Box>
//           ) : (
//             <TableContainer component={Paper}>
//               <Table sx={{ minWidth: 650 }} aria-label="reports table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Name</TableCell>
//                     <TableCell>Email</TableCell>
//                     <TableCell>Subject</TableCell>
//                     <TableCell>Custom Subject</TableCell>
//                     <TableCell>Reported User</TableCell>
//                     <TableCell>Reporter ID</TableCell>
//                     <TableCell>Date</TableCell>
//                     <TableCell>Action</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {filteredReports
//                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                     .map((report) => (
//                       <TableRow key={report._id}>
//                         <TableCell>{report.name}</TableCell>
//                         <TableCell>{report.email}</TableCell>
//                         <TableCell>
//                           <Chip
//                             label={report.subject.toUpperCase()}
//                             color={getSubjectColor(report.subject)}
//                             size="small"
//                           />
//                         </TableCell>
//                         <TableCell>{report.customSubject || 'N/A'}</TableCell>
//                         <TableCell>
//                           <Box sx={{ display: 'flex', gap: 1 }}>
//                             {report.username && <Chip label={report.username} size="small" />}
//                             {report.reportedUserId && (
//                               <Chip
//                                 label={`ID: ${typeof report.reportedUserId === 'object'
//                                   ? report.reportedUserId._id
//                                   : report.reportedUserId}`}
//                                 color="secondary"
//                                 size="small"
//                               />
//                             )}
//                           </Box>
//                         </TableCell>
//                         <TableCell>
//                           {report.reporterUserId
//                             ? (typeof report.reporterUserId === 'object'
//                               ? report.reporterUserId._id || report.reporterUserId.userName
//                               : report.reporterUserId)
//                             : 'Guest'}
//                         </TableCell>
//                         <TableCell>{format(new Date(report.createdAt), 'yyyy-MM-dd HH:mm')}</TableCell>
//                         <TableCell>
//                           <Tooltip title="View Details">
//                             <IconButton onClick={() => handleOpenDialog(report)} size="small">
//                               <VisibilityIcon color="primary" />
//                             </IconButton>
//                           </Tooltip>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}

//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={filteredReports.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             labelRowsPerPage="Rows:"
//             sx={{
//               '& .MuiTablePagination-toolbar': {
//                 flexWrap: 'wrap',
//                 justifyContent: 'center'
//               }
//             }}
//           />
//         </CardContent>
//       </Card>

//       {/* Message Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//         <DialogTitle>
//           Report Details
//           <IconButton
//             aria-label="close"
//             onClick={handleCloseDialog}
//             sx={{
//               position: 'absolute',
//               right: 8,
//               top: 8,
//               color: (theme) => theme.palette.grey[500],
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           {selectedReport && (
//             <>
//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="subtitle1" gutterBottom>
//                   <strong>From:</strong> {selectedReport.name} ({selectedReport.email})
//                 </Typography>
//                 <Typography variant="subtitle1" gutterBottom>
//                   <strong>Subject:</strong> {selectedReport.subject}
//                   {selectedReport.customSubject && ` - ${selectedReport.customSubject}`}
//                 </Typography>
//                 <Typography variant="subtitle1" gutterBottom>
//                   <strong>Date:</strong> {format(new Date(selectedReport.createdAt), 'yyyy-MM-dd HH:mm')}
//                 </Typography>
//               </Box>
//               <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
//                 <Typography variant="h6" gutterBottom>
//                   Message:
//                 </Typography>
//                 <DialogContentText>
//                   {selectedReport.message}
//                 </DialogContentText>
//               </Box>
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default ViewReports;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  MenuItem,
  Chip,
  Paper,
  Grid,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

const ViewReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    subject: '',
    search: '',
    startDate: null,
    endDate: null
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchReports();
  }, [filters]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/reports/view');
      setReports(response.data.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    });
    setPage(0);
  };

  const handleOpenDialog = (report) => {
    setSelectedReport(report);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReport(null);
  };

  const filteredReports = reports.filter(report => {
    return (
      (filters.subject === '' || report.subject === filters.subject) &&
      (filters.search === '' ||
        report.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        report.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        (report.username && report.username.toLowerCase().includes(filters.search.toLowerCase())) ||
        report.message.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.startDate || new Date(report.createdAt) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(report.createdAt) <= new Date(filters.endDate))
    );
  });

  const getSubjectColor = (subject) => {
    switch (subject) {
      case 'report-user': return 'error';
      case 'bug-report': return 'warning';
      case 'other': return 'success';
      default: return 'primary';
    }
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 3 } }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            Reports Management
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                label="Subject"
                value={filters.subject}
                onChange={(e) => handleFilterChange('subject', e.target.value)}
                InputProps={{
                  startAdornment: <FilterAltIcon color="action" sx={{ mr: 1 }} />
                }}
                size={isSmallScreen ? 'small' : 'medium'}
              >
                <MenuItem value="">All Subjects</MenuItem>
                <MenuItem value="report-user">Report User</MenuItem>
                <MenuItem value="bug-report">Bug Report</MenuItem>
                <MenuItem value="general-inquiry">General Inquiry</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={filters.startDate || ''}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                size={isSmallScreen ? 'small' : 'medium'}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={filters.endDate || ''}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                size={isSmallScreen ? 'small' : 'medium'}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Search"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton size={isSmallScreen ? 'small' : 'medium'}>
                      <SearchIcon fontSize={isSmallScreen ? 'small' : 'medium'} />
                    </IconButton>
                  )
                }}
                size={isSmallScreen ? 'small' : 'medium'}
              />
            </Grid>
          </Grid>

          {isSmallScreen ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
              {filteredReports
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((report) => (
                  <Paper key={report._id} sx={{ p: 2, width: '100%' }}>
                    <Stack spacing={1.5} width="100%">
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            {report.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {report.email}
                          </Typography>
                        </Box>
                        <IconButton 
                          onClick={() => handleOpenDialog(report)} 
                          size="small"
                          sx={{ alignSelf: 'flex-start' }}
                        >
                          <VisibilityIcon color="primary" fontSize="small" />
                        </IconButton>
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box>
                          <Typography variant="caption" fontWeight="bold">Subject:</Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 0.5 }}>
                            <Chip
                              label={report.subject.toUpperCase()}
                              color={getSubjectColor(report.subject)}
                              size="small"
                              sx={{ alignSelf: 'flex-start' }}
                            />
                            {report.customSubject && (
                              <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                                {report.customSubject}
                              </Typography>
                            )}
                          </Box>
                        </Box>

                        {report.username && (
                          <Box>
                            <Typography variant="caption" fontWeight="bold">Reported User:</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 0.5 }}>
                              <Chip 
                                label={report.username} 
                                size="small" 
                                sx={{ alignSelf: 'flex-start' }}
                              />
                              {report.reportedUserId && (
                                <Chip
                                  label={`ID: ${typeof report.reportedUserId === 'object'
                                    ? report.reportedUserId._id
                                    : report.reportedUserId}`}
                                  color="secondary"
                                  size="small"
                                  sx={{ alignSelf: 'flex-start' }}
                                />
                              )}
                            </Box>
                          </Box>
                        )}

                        <Box>
                          <Typography variant="caption" fontWeight="bold">Reporter:</Typography>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {report.reporterUserId
                              ? (typeof report.reporterUserId === 'object'
                                ? report.reporterUserId._id || report.reporterUserId.userName
                                : report.reporterUserId)
                              : 'Guest'}
                          </Typography>
                        </Box>

                        <Typography variant="caption" color="text.secondary">
                          {format(new Date(report.createdAt), 'yyyy-MM-dd HH:mm')}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                ))}
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="reports table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Custom Subject</TableCell>
                    <TableCell>Reported User</TableCell>
                    <TableCell>Reporter ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredReports
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((report) => (
                      <TableRow key={report._id}>
                        <TableCell>{report.name}</TableCell>
                        <TableCell>{report.email}</TableCell>
                        <TableCell>
                          <Chip
                            label={report.subject.toUpperCase()}
                            color={getSubjectColor(report.subject)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{report.customSubject || 'N/A'}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            {report.username && <Chip label={report.username} size="small" />}
                            {report.reportedUserId && (
                              <Chip
                                label={`ID: ${typeof report.reportedUserId === 'object'
                                  ? report.reportedUserId._id
                                  : report.reportedUserId}`}
                                color="secondary"
                                size="small"
                              />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          {report.reporterUserId
                            ? (typeof report.reporterUserId === 'object'
                              ? report.reporterUserId._id || report.reporterUserId.userName
                              : report.reporterUserId)
                            : 'Guest'}
                        </TableCell>
                        <TableCell>{format(new Date(report.createdAt), 'yyyy-MM-dd HH:mm')}</TableCell>
                        <TableCell>
                          <Tooltip title="View Details">
                            <IconButton onClick={() => handleOpenDialog(report)} size="small">
                              <VisibilityIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredReports.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Rows:"
            sx={{
              '& .MuiTablePagination-toolbar': {
                flexWrap: 'wrap',
                justifyContent: 'center'
              }
            }}
          />
        </CardContent>
      </Card>

      {/* Message Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Report Details
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedReport && (
            <>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>From:</strong> {selectedReport.name} ({selectedReport.email})
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Subject:</strong> {selectedReport.subject}
                  {selectedReport.customSubject && ` - ${selectedReport.customSubject}`}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Date:</strong> {format(new Date(selectedReport.createdAt), 'yyyy-MM-dd HH:mm')}
                </Typography>
              </Box>
              <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Message:
                </Typography>
                <DialogContentText>
                  {selectedReport.message}
                </DialogContentText>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewReports;