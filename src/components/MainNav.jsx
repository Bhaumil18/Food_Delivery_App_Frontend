import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import MainMenu from "./MainMenu";
import { useSelector } from "react-redux";

const MainNav = () => {
    const { user } = useSelector(state => state.user);

    const [email, setEmail] = useState('');

    useEffect(() => {
        setEmail('' || user?.email);
    }, [user])

    return (
        <div className="flex space-x-2 items-center">
            {
                user ?
                    <MainMenu email={email}></MainMenu>
                    : <Button
                        variant={"ghost"}
                        className="font-bold bg-orange-500 text-white hover:text-orange-500 hover:bg-white"
                    >
                        <NavLink to={'/login'}>
                            Log In
                        </NavLink>
                    </Button>
            }
        </div>
    );
};

export default MainNav;
