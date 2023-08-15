import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import {
  QuoteListContainer,
  VoteCount,
  Percentage,
  Votes,
  QuoteContent,
  PaginationContainer,
  ModalContent,
  VoteButton,
  Author,
  ModalOverlay,
  ModalTitle,
  ModalForm,
  ModalLabel,
  ModalInput,
  ModalButton,
  ModalCloseButton,
  StepContent,
  PaginationText,
  StyledPagination,
  HeaderContainer,
  Greeting,
  Title,
  SortContainer,
  SortLabel,
  SortSelect,
  SortButton,
  AddQuoteButton,
  FilterLabel,
  FilterContainer,
  Head,
  StyledSelectContainer,
  StyledSelect,
} from "./QuoteList.styled";
const API_BASE_URL = "http://localhost:8000";
const ACCESS_TOKEN_KEY = "accessToken";
const QUOTES_PER_PAGE = 5;

const QuoteList = () => {
  const [user, setUser] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [userVotes, setUserVotes] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortOption, setSortOption] = useState("upvotesCount");
  const [sortDirection, setSortDirection] = useState("desc");
  const [totalPages, setTotalPages] = useState(1);
  const [newQuoteContent, setNewQuoteContent] = useState("");
  const [newQuoteAuthor, setNewQuoteAuthor] = useState("");
  const [newQuoteTags, setNewQuoteTags] = useState("");
  const [isAddingQuote, setIsAddingQuote] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const username = localStorage.getItem("username");

    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      setUser({ id: username });
    }

    fetchQuotes(currentPage, selectedTags);
  }, [currentPage, selectedTags, sortOption, sortDirection]);

  useEffect(() => {
    const storedVotes = localStorage.getItem("userVotes");
    if (storedVotes) {
      setUserVotes(JSON.parse(storedVotes));
    }
  }, []);

  const saveUserVotes = useCallback((votes) => {
    localStorage.setItem("userVotes", JSON.stringify(votes));
  }, []);

  const fetchQuotes = useCallback(
    (page, tags) => {
      const config = {
        params: {
          tags: tags.join(","),
          page,
          pageSize: QUOTES_PER_PAGE,
          sortBy: sortOption,
          sortDirection,
        },
      };

      axios
        .get(`${API_BASE_URL}/quotes`, config)
        .then((response) => {
          setQuotes(response.data.quotes);
          setTotalPages(Math.ceil(response.data.quotesCount / QUOTES_PER_PAGE));
        })
        .catch((error) => {
          console.log("Error fetching quotes:", error);
        });
    },
    [sortOption, sortDirection]
  );

  const handleVote = async (quoteId, voteType) => {
    const hasVoted =
      userVotes[user.id] && userVotes[user.id][quoteId] === voteType;

    try {
      if (hasVoted) {
        await axios.delete(`${API_BASE_URL}/quotes/${quoteId}/${voteType}`);
      } else {
        await axios.post(`${API_BASE_URL}/quotes/${quoteId}/${voteType}`);
      }

      fetchQuotes(currentPage, selectedTags);
      const newUserVotes = {
        ...userVotes,
        [user.id]: {
          ...userVotes[user.id],
          [quoteId]: hasVoted ? "none" : voteType,
        },
      };
      setUserVotes(newUserVotes);
      saveUserVotes(newUserVotes);
    } catch (error) {
      console.log("Error voting for the quote:", error);
    }
  };

  const getVoteButtonColor = (quoteId, voteType) => {
    const userVote = userVotes[user.id];
    if (userVote && userVote[quoteId] === voteType) {
      return voteType === "upvote" ? "green" : "red";
    }
    return "grey";
  };

  const handleTagFilter = (event) => {
    const selectedOptions = event.target.selectedOptions;
    const selectedTags = Array.from(selectedOptions).map(
      (option) => option.value
    );

    if (selectedTags.includes("none")) {
      setSelectedTags([]);
    } else {
      setSelectedTags(selectedTags);
    }
    setCurrentPage(1);
  };

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSortDirectionChange = () => {
    setSortDirection((prevSortDirection) =>
      prevSortDirection === "desc" ? "asc" : "desc"
    );
  };

  const handleAddQuote = async (e) => {
    e.preventDefault();
    const newQuoteTagsArray = newQuoteTags.split(",").map((tag) => tag.trim());

    try {
      await axios.post(`${API_BASE_URL}/quotes`, {
        content: newQuoteContent,
        author: newQuoteAuthor,
        tags: newQuoteTagsArray,
      });
      setNewQuoteContent("");
      setNewQuoteAuthor("");
      setNewQuoteTags("");

      fetchQuotes(currentPage, selectedTags);
    } catch (error) {
      console.log("Error adding a new quote:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const getVotePercentageColor = (quote) => {
    const totalVotes = quote.upvotesCount + quote.downvotesCount;
    const votePercentage = (quote.upvotesCount / totalVotes) * 100;

    if (votePercentage >= 80) {
      return "green";
    } else if (votePercentage >= 60) {
      return "yellow";
    } else if (votePercentage >= 40) {
      return "orange";
    } else if (votePercentage >= 20) {
      return "red";
    } else {
      return "darkred";
    }
  };

  const openAddQuoteModal = () => {
    setIsAddingQuote(true);
  };

  const closeAddQuoteModal = () => {
    setIsAddingQuote(false);
    setNewQuoteContent("");
    setNewQuoteAuthor("");
    setNewQuoteTags("");
  };

  return (
    <div>
      {" "}
      <Head>
        <HeaderContainer>
          <Greeting>
            Hello, {localStorage.getItem("username").toUpperCase()}🖐️!{" "}
            <Title>Our Quotes:</Title>
          </Greeting>
        </HeaderContainer>
        {user && (
          <div>
            {user && (
              <div>
                <AddQuoteButton onClick={openAddQuoteModal}>
                  Add a Quote
                </AddQuoteButton>
              </div>
            )}
          </div>
        )}
        <FilterContainer>
          <FilterLabel>Filter by Tags:</FilterLabel>
          <StyledSelectContainer>
            <StyledSelect
              multiple
              value={selectedTags}
              onChange={handleTagFilter}
            >
              <option value="none">None</option>
              {[
                "be yourself",
                "honesty",
                "inspirational",
                "human nature",
                "humor",
                "infinity",
                "philosophy",
                "science",
                "stupidity",
                "universe",
                "books",
                "simile",
                "soul",
                "life",
                "action",
                "wish",
              ].map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </StyledSelect>
          </StyledSelectContainer>
        </FilterContainer>

        <SortContainer>
          <SortLabel>Sort by:</SortLabel>
          <StyledSelectContainer>
            <StyledSelect value={sortOption} onChange={handleSortOptionChange}>
              <option value="upvotesCount">Upvotes</option>
              <option value="downvotesCount">Downvotes</option>
            </StyledSelect>
          </StyledSelectContainer>
          <SortButton onClick={handleSortDirectionChange}>
            {sortDirection === "desc" ? "Descending" : "Ascending"}
          </SortButton>
        </SortContainer>
      </Head>
      <QuoteListContainer>
        {quotes.map((quote) => (
          <div
            style={{
              display: "flex",
              backgroundColor: "White",
              width: "80%",
              padding: "20px",
              margin: "10px",
              borderRadius: "15px",
            }}
            key={quote.id}
          >
            <Votes>
              <VoteButton
                onClick={() => handleVote(quote.id, "upvote")}
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <span
                  style={{
                    color: getVoteButtonColor(quote.id, "upvote"),
                  }}
                >
                  &#9650;
                </span>
              </VoteButton>

              <Percentage
                style={{
                  color: getVotePercentageColor(quote),
                }}
              >
                {(
                  (quote.upvotesCount /
                    (quote.upvotesCount + quote.downvotesCount)) *
                  100
                ).toFixed(1)}
                %
              </Percentage>
              <VoteCount>
                {quote.upvotesCount}/{quote.downvotesCount}
              </VoteCount>
              <VoteButton
                onClick={() => handleVote(quote.id, "downvote")}
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <span
                  style={{
                    color: getVoteButtonColor(quote.id, "downvote"),
                  }}
                >
                  &#9660;
                </span>
              </VoteButton>
            </Votes>{" "}
            <QuoteContent>
              <StepContent>{quote.content}</StepContent>{" "}
              <Author>- {quote.author}</Author>
            </QuoteContent>{" "}
          </div>
        ))}
      </QuoteListContainer>
      {totalPages > 1 && (
        <PaginationContainer>
          {" "}
          <PaginationText>
            Page {currentPage} of {totalPages}
          </PaginationText>
          <StyledPagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
          />{" "}
          <div style={{ marginLeft: "180px" }}>
            {" "}
            &copy; 2023 ,Made by Amil Kahrovic,NIT
          </div>
        </PaginationContainer>
      )}
      <Modal
        open={isAddingQuote}
        onClose={closeAddQuoteModal}
        aria-labelledby="add-quote-modal"
      >
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Add a New Quote</ModalTitle>
            <ModalForm onSubmit={handleAddQuote}>
              <label>Content:</label>
              <ModalInput
                type="text"
                value={newQuoteContent}
                onChange={(e) => setNewQuoteContent(e.target.value)}
              />
              <label>Author:</label>
              <ModalInput
                type="text"
                value={newQuoteAuthor}
                onChange={(e) => setNewQuoteAuthor(e.target.value)}
              />
              <ModalLabel>Tags:</ModalLabel>
              <ModalInput
                type="text"
                value={newQuoteTags}
                onChange={(e) => setNewQuoteTags(e.target.value)}
              />
              <ModalButton type="submit">Add Quote</ModalButton>
              <ModalCloseButton type="button" onClick={closeAddQuoteModal}>
                Close
              </ModalCloseButton>
            </ModalForm>
          </ModalContent>
        </ModalOverlay>
      </Modal>{" "}
    </div>
  );
};

export default QuoteList;
