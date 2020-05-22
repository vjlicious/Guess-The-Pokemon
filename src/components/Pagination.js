import React from "react";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function BasicPagination({ pokePerPage, totalPoke }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
 
  return (
    <div className={classes.root}>
   
    </div>
  );
}

// import React from "react";

// function Pagination({ pokePerPage, totalPoke }) {
//   const pageNumber = [];

//   for (let i = 1; i <= Math.ceil(totalPoke / pokePerPage); i++) {
//     pageNumber.push(i);
//   }
//   return (
//     <nav>
//       <ul className="pagination">
//         {pageNumber.map((number) => (
//           <li key={number} className="page-item">
//             <a href="!#" className="page-link"></a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }

// export default Pagination;
