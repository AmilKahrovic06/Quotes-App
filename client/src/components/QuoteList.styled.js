import styled from "styled-components";
import Pagination from "@mui/material/Pagination";

export const QuoteListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //   background-color: #00388c;
  margin-top: 80px;
  margin-bottom: 60px;
`;

export const UserInfo = styled.div`
  margin-bottom: 10px;
`;

export const AddButton = styled.div`
  margin-bottom: 10px;
`;

export const Filter = styled.div`
  margin-bottom: 10px;
`;

export const Sort = styled.div`
  margin-bottom: 10px;
`;

// export const Quote = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 2fr;

//   width: 80%;
//   padding: 20px;
//   border: 1px solid #ccc;
//   margin-top: 7px;
//   margin-bottom: 7px;
//   background-color: white;
//   border-radius: 15px;
//   flex-direction: row;
// `;

export const VoteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 20px;
  margin-left: 15px;
  color: ${(props) => (props.voted ? "#2ecc71" : "black")};
`;

export const VoteCount = styled.span`
  margin: 0 10px;
  color: black;
  font-size: 14px; /* Adjust font size as needed */
`;

export const Percentage = styled.p`
  font-size: 20px;
  margin-top: 5px;
  font-weight: 1000;
`;

export const Voted = styled.span`
  font-weight: bold;
`;

export const Votes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  //   margin-top: 50px;
  margin-left: 35px;
`;

export const QuoteContent = styled.div`
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   justify-content: center;
  //   text-align: center;
  margin-top: 20px;
  //   padding: 10px;
  //   margin-left: 100px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 50px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ModalLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

export const ModalInput = styled.input`
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

export const ModalButton = styled.button`
  padding: 5px 10px;
  margin-left: 10px;
  border: none;
  border-radius: 3px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  margin-top: 20px;
`;

export const ModalCloseButton = styled.button`
  color: #999;
  padding: 5px 10px;
  margin-left: 10px;
  border: none;
  border-radius: 3px;
  background-color: red;
  color: white;
  cursor: pointer;
  margin-top: 20px;
`;
export const Author = styled.p`
  color: grey;
  margin-left: 20cm;
`;

export const StepContent = styled.p`
  color: black;
  font-weight: 600;
  margin-left: 100px;
`;

export const StyledPagination = styled(Pagination)`
  && {
    .MuiPaginationItem-root {
      color: white;
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  background-color: #24232b;
  color: white;
  -webkit-box-shadow: 0px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 10px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 10px 5px 0px rgba(0, 0, 0, 0.75);
`;

export const PaginationText = styled.p`
  color: white;
  font-size: 1rem;
  margin-right: 10px;
`;

export const HeaderContainer = styled.div`
  margin-bottom: 20px;
`;

export const Greeting = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin-left: -90px;
  margin-top: 40px;
  padding-right: 60px;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: white;
`;

export const FilterContainer = styled.div`
  margin-bottom: 10px;
  //   align-items: center;
  margin-left: 250x;
  padding-left: 120px;
`;

export const FilterLabel = styled.label`
  font-size: 16px;
  margin-right: 10px;
  color: white;
  position: relative;
  //   top: -50px;
`;
export const SortContainer = styled.div`
  margin-bottom: 10px;
  margin-left: 150px;
`;

export const SortLabel = styled.label`
  font-size: 16px;
  margin-right: 10px;
  color: white;
`;

export const AddQuoteButton = styled.button`
  font-size: 15px;
  padding: 4px 8px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #03ff3d;
  }
`;

export const FilterSelect = styled.select`
  font-size: 14px;
  padding: 4px 8px;
`;

export const SortSelect = styled.select`
  font-size: 14px;
  padding: 4px 8px;
`;

export const SortButton = styled.button`
  font-size: 14px;
  padding: 10px 8px;
  border-radius: 5px;
  //   background-color: #3498db;
  background-color: #023a5f;
  color: white;
  border: none;
  cursor: pointer;
  margin: 20px;
  &:hover {
    background-color: #ddd;
  }
`;
export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #24232b;

  -webkit-box-shadow: 0px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 10px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 10px 5px 0px rgba(0, 0, 0, 0.75);
`;

export const StyledSelectContainer = styled.div`
  position: relative;
  margin-right: 10px;
`;

export const StyledSelect = styled.select`
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #023a5f;
  color: white;
  cursor: pointer;
  width: 150px;
`;
