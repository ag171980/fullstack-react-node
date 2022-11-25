import { Link } from "react-router-dom";
import Home from '../../pages/Home/Home'
import { Form, Button } from "react-bootstrap";
const Header = () => {
    return (
        <header className="header d-flex flex-direction-row justify-content-between align-items-center bg-dark p-2">
            <h2>Meety</h2>
            {/* <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form> */}
            <div className="menu">
                <Link to="/home" >Home</Link>
                <Link to="/home" >Chats</Link>
            </div>
        </header>
    )
}
export default Header;