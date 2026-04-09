import { useCallback, useEffect, useState } from 'react';
import './App.css';

const API = "http://localhost:3001";

function App() {
  const [view, setView] = useState('computador');

  const [computadores, setComputadores] = useState([]);
  const [formComputador, setFormComputador] = useState({ id: null, nome: '', cor: '', datafabricacao: '' });

  const [perifericos, setPerifericos] = useState([]);
  const [formPeriferico, setFormPeriferico] = useState({ id: null, nome: '', computadorid: '' });

  const fetchComputadores = useCallback(async () => {
    const res = await fetch(`${API}/computador`);
    const data = await res.json(); 
    setComputadores(data);
  }, []);

  const fetchPerifericos = useCallback(async () => {
    const res = await fetch(`${API}/periferico`);
    const data = await res.json(); 
    setPerifericos(data); 
  }, []);

  useEffect(() => {
    fetchComputadores();
    fetchPerifericos();
  }, [fetchComputadores, fetchPerifericos]);

  const saveComputador = async () => {
    if (!formComputador.nome || !formComputador.cor) return alert("Preencha nome e cor");

    const method = formComputador.id ? 'PUT' : 'POST';
    const URL = formComputador.id ? `${API}/computador/${formComputador.id}` : `${API}/computador`;

    const res = await fetch(URL, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        nome: formComputador.nome,
        cor: formComputador.cor,
        datafabricacao: Number(formComputador.datafabricacao)
      })
    });

    if (res.ok) {
      setFormComputador({ id: null, nome: '', cor: '', datafabricacao: '' });
      fetchComputadores();
    } else {
      alert("Erro ao salvar computador");
    }
  };

  const savePeriferico = async () => {
    if (!formPeriferico.nome || !formPeriferico.computadorid) return alert("Preencha nome e selecione o PC");

    const method = formPeriferico.id ? 'PUT' : 'POST';
    const URL = formPeriferico.id ? `${API}/periferico/${formPeriferico.id}` : `${API}/periferico`;

    const res = await fetch(URL, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formPeriferico)
    });

    if (res.ok) {
      setFormPeriferico({ id: null, nome: '', computadorid: '' });
      fetchPerifericos();
    } else {
      alert("Erro ao salvar periférico");
    }
  };

  const deleteItem = async (rota: string, id: string) => {
    if (!confirm("Deseja excluir?")) return;
    await fetch(`${API}/${rota}/${id}`, { method: 'DELETE' });
    fetchComputadores();
    fetchPerifericos();
  };

  return (
    <div className="container">
      <nav>
        <button onClick={() => setView('computador')}>Computadores</button>
        <button onClick={() => setView('periferico')}>Periféricos</button>
      </nav>

      {view === "computador" ? (
        <div className='secao'>
          <h2>Gerenciar Computadores</h2>
          <div className='forms'>
            <input type="text" placeholder='Nome' value={formComputador.nome} 
              onChange={(e) => setFormComputador({ ...formComputador, nome: e.target.value })} />
            
            <input type="text" placeholder='Cor' value={formComputador.cor} 
              onChange={(e) => setFormComputador({ ...formComputador, cor: e.target.value })} />
            
            <input type="number" placeholder='Ano' value={formComputador.datafabricacao} 
              onChange={(e) => setFormComputador({ ...formComputador, datafabricacao: e.target.value })} />

            <button onClick={saveComputador}>{formComputador.id ? 'Atualizar' : 'Criar'}</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Nome</th><th>Cor</th><th>Ano</th><th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {computadores.map((c: any) => (
                <tr key={c.id}>
                  <td>{c.nome}</td><td>{c.cor}</td><td>{c.datafabricacao}</td>
                  <td>
                    <button onClick={() => setFormComputador(c)}>Editar</button>
                    <button onClick={() => deleteItem('computador', c.id)}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='secao'>
          <h2>Gerenciar Periféricos</h2>
          <div className='forms'>
            <input type="text" placeholder='Nome do periférico' value={formPeriferico.nome}
              onChange={(e) => setFormPeriferico({ ...formPeriferico, nome: e.target.value })} />
            
            <select value={formPeriferico.computadorid} 
              onChange={(e) => setFormPeriferico({ ...formPeriferico, computadorid: e.target.value })}>
              <option value="">Selecione o Computador</option>
              {computadores.map((c: any) => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>

            <button onClick={savePeriferico}>{formPeriferico.id ? 'Atualizar' : 'Criar'}</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Nome</th><th>Vínculo (PC)</th><th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {perifericos.map((p: any) => (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>{p.computador?.nome || 'N/A'}</td>
                  <td>
                    <button onClick={() => setFormPeriferico({id: p.id, nome: p.nome, computadorid: p.computadorid})}>Editar</button>
                    <button onClick={() => deleteItem('periferico', p.id)}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;