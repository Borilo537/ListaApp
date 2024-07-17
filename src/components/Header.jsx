import React, { useState } from 'react';
import '../App.css';
import editImage from '../assets/editar.png';
import trashImage from '../assets/trash.png';
import Modal from 'react-modal';

// Definindo o elemento root para o Modal
Modal.setAppElement('#root');

const Header = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleTrashMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleTrashMouseLeave = () => {
        setHoveredIndex(null);
    };

    const handleTrashClick = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const handleEditClick = (index) => {
        console.log('clicou: ', index);
        setIsModalVisible(true);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setItems([...items, inputValue]);
            setInputValue('');
        }
        setHoveredIndex(null);
    };

    return (
        <header className="Header">
            <h1>Lista de APPS</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Digite um item"
                    />
                </div>
                <button type="submit">Adicionar</button>
            </form>

            <Modal
                isOpen={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
                contentLabel="Editar Item"
                className="Modal"
                overlayClassName="Overlay"
            >
                <div>
                    <h2>Editar Item</h2>
                    <button onClick={() => setIsModalVisible(false)}>Fechar</button>
                </div>
            </Modal>

            <ul>
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={hoveredIndex === index ? 'hovered' : 'nothover'}
                    >
                        {item}
                        <div>
                            <img
                                src={editImage}
                                alt="Editar"
                                onClick={() => handleEditClick(index)}
                            />
                            <img
                                src={trashImage}
                                className="Trash"
                                alt="Excluir"
                                onMouseEnter={() => handleTrashMouseEnter(index)}
                                onMouseLeave={handleTrashMouseLeave}
                                onClick={() => handleTrashClick(index)}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </header>
    );
};

export default Header;
