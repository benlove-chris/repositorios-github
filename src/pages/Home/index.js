//import logo from './logo.svg';
//import './App.css';

//<h1>{ props.title } {props.user}</h1>


import React, { useState } from 'react';
import axios from 'axios';
import * as S from './styled';
import { useHistory } from 'react-router-dom';
//import style from 'style.css';

function App(props) {
  const [ usuario, setUsuario ] = useState('');
  const [ erro, setErro ] = useState(false);

  const history = useHistory();

  function handlePesquisa(){
    //axios.get('https://api.github.com//users/benlove-chris/repos').then(reponse => console.log(reponse));
    axios.get(`https://api.github.com/users/${usuario}/repos`)
    .then(reponse => {
      const repositories = reponse.data;
      const repositoriesName = [];
      repositories.map((repository) => {
        repositoriesName.push(repository.name);
      });
      localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
      history.push('/repositories');
    })
    .catch(err => {
      setErro(true);
    });

  }


  return (
    <S.HomeContainer> 
      <S.Content> 
        
        <S.Input className="usuarioInput" placeholder="Usuário" value={usuario} onChange={e => setUsuario(e.target.value)} />
        <S.Button type="button" onClick={handlePesquisa}> Pesquisar </S.Button>
      </S.Content> 
      { erro ? <S.ErrorMsg>Ocorreu um erro. Digite um usuário válido.</S.ErrorMsg> : '' }
    </S.HomeContainer> 
  );
}

export default App;






