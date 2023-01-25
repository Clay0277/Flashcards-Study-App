import React, { useState, useEffect } from "react";
import { Link, useParams,  useNavigate } from "react-router-dom";
import { readDeck, deleteDeck } from "../../utils/api/index";
import NavBar from "../Common/NavBar";
import CardsList from "../Cards/CardsList";


function Deck() {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const [deck, setDeck] = useState({});


    //load deck & cards
    useEffect(() => {
        async function loadDeck() {
                if (deckId) {
                const loadedDeck = await readDeck(deckId);
                setDeck(()=>loadedDeck);
                }
            }
        loadDeck();
    }, [deckId]);

    //delete the deck 
    const handleDeckDelete = async () => {
        const confirm = window.confirm("Delete this deck? You will not be able to recover it.");
        if (confirm) {
            await deleteDeck(deckId);
            navigate.push("/");
        }
    };


if (deck.id) {
        return (
            <div>
            <NavBar link={`/decks/${deckId}`} linkName={deck.name} pageName={"Edit Deck"} />
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
                 <div className="row justify-content-between">
                    <div className="col-8">
                        <Link to={`/decks/${deckId}/edit`}>
                            <button className="btn btn-secondary mr-1">
                                <i className="bi bi-pencil mr-1"></i>
                                Edit
                            </button>
                        </Link>
                        <Link to={`/decks/${deckId}/study`}>
                            <button className="btn btn-primary mr-1">
                                <i className="bi bi-book mr-1"></i>
                                Study
                            </button>
                        </Link>
                        <Link to={`/decks/${deckId}/cards/new`}>
                            <button className="btn btn-primary">
                                <i className="bi bi-plus mr-1"></i>
                                Add Card
                            </button>
                        </Link>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-danger" onClick={handleDeckDelete}><span className="glyphicon glyphicon-trash" aria-hidden="true"></span>Delete</button>
                    </div>
                </div>
                <CardsList deck={deck} />
                </div>
            
        )
      } 
              return "Please create a new deck!"
    }


export default Deck;