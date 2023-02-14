    import React from "react";  
    import {useState} from "react";
    import {useParams} from "react-router-dom" 
    import {useEffect} from "react";
    import { NavLink}    from "react-router-dom";
    import axios from "axios";
    import styled from "styled-components";

    
const Detail = styled.div`
position: relative;
left: 20%;
width: 75%;
color: white;
font-size: 25px;
text-align: center;
`;

const ResidentsList = styled.ul`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
`;

const Resident = styled.li`
display: flex;
flex-direction: column;
align-items: center;
margin: 10px;
`;

const NativeBornsList = styled.ul`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
`;

const NativeBorn = styled.li`
display: flex;
flex-direction: column;
align-items: center;
margin: 10px;
`;
const StyledNavLink = styled(NavLink)`
  color: white;
  
  &:active,
  &:hover {
    color: #00f;
  }
`;


    export default function LocationDetail(props) {
    const {id} = useParams()
    const [location , setLocation] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData() {  
        const data = await axios(`/all/findLocation/${id}`);
        setLocation(data.data);
        setIsLoading(false);
    }
    useEffect(() => {
        fetchData();
    }, [id]);

    if (isLoading) {
    return <div>Loading...</div>;
    }

    const { location: loc } = location;
    const {characters} = location;
    const origins = []
    const locations = characters.filter(c => {
   
        if (c.originID == id) {
            
          origins.push(c);
          return false;
        }
        return true;
      });


    if (!loc) {
    return <div>No location found</div>;
    }
    if (!id) {
        return <div>Loading...</div>;
    }
   
    const { name, type, dimension } = loc;

    return (
        <Detail>
          <StyledNavLink to={"/Home"}>GoBack</StyledNavLink>
          <h1> {name}</h1>
            <h2>Type: {type}</h2>
            <h2>Dimension: {dimension}</h2>
          <h2>Residents: </h2>
          <ResidentsList>
            {locations.map((location) => (
              <Resident key={location.id}>
                <StyledNavLink to={`/detail/${location.id}`}>
                  <p>{location.name}</p>
                </StyledNavLink>
              </Resident>
            ))}
          </ResidentsList>
          <h2>Native Borns: </h2>
          <NativeBornsList>
            {origins.map((origin) => (
              <NativeBorn key={origin.id}>
                <StyledNavLink to={`/detail/${origin.id}`}>
                  <p>{origin.name}</p>
                </StyledNavLink>
              </NativeBorn>
            ))}
          </NativeBornsList>
        </Detail>
      );
    }