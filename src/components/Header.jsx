import { React, useState } from 'react';
import '../App.css';
import editImage from '../assets/editar.png';
import trashImage from '../assets/trash.png';


const Header = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

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


    const [inputValue, setInputValue] = useState('');
    const [colorValue, setColorValue] = useState('');
    const [items, setItems] = useState([]);

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
            <ul>
                {items.map((item, index) => (
                    <li key={index}
                        className={hoveredIndex === index ? 'hovered' : 'nothover'}>
                        {item}
                        <div>
                            <img src={editImage} />
                            <img src={trashImage}
                                className='Trash'
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