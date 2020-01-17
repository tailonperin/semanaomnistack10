import React, {useState, useEffect} from 'react';

function DevForm({onSubmit}){
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    async function handleSubmit(e){
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });

        setGithubUsername('');
        setTechs('');
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const {latitude, longitude} = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
          },
          (err) => {
            console.log(err);
          },
          {
    
          }
        );
      }, [])

    return (
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do GitHub</label>
            <input id="github_username" name="github_username" required value={github_username} onChange={e => setGithubUsername(e.target.value)}></input>
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input id="techs" name="techs" required value={techs} onChange={e => setTechs(e.target.value)}></input>
          </div>
          
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input type="number" id="latitude" name="latitude" value={latitude} onChange={e => setLatitude(e.target.value)} required></input>
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input type="number" id="longitude" name="longitude" value={longitude} onChange={e => setLongitude(e.target.value)} required></input>
            </div>  
          </div>
          <button type="submit">Salvar</button>
        </form>
    );
}

export default DevForm;