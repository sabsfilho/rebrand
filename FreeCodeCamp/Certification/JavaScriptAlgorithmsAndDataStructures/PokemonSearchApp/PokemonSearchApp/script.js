const URL = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';

const getEl = id => document.getElementById(id);

const setElN = (obj, n, id) => setEl(id?id:n,obj[n]);

const setElStat = (obj, n, id) => setEl(id?id:n, obj.stats.find((o)=>o.stat.name===n).base_stat);

const setEl = (id, v) => getEl(id).textContent = v;

const updateFields = obj => { 
  setElN(obj, 'name', 'pokemon-name');
  setElN(obj, 'id', 'pokemon-id');
  setElN(obj, 'weight');
  setElN(obj, 'height');
  setElStat(obj, 'hp');
  setElStat(obj, 'attack');
  setElStat(obj, 'defense');
  setElStat(obj, 'special-attack');
  setElStat(obj, 'special-defense');
  setElStat(obj, 'speed');

  getEl('sprite').src = obj.sprites.front_default;

  getEl('types').innerHTML = obj.types.map(o=>`<div>${o.type.name}</div>`).join('');
};

const clearID = (id) => {
  return id.toLowerCase().replace(/[ ]/g, '-').replace(/[^\w\d-]/g,'')
};

const query = async (id) => {

  if (!id){
    alert('Pokémon not found');
    return
  }

  try {
    const url = `${URL}/${clearID(id)}`;
    const res = await fetch(url);
    if (res.ok){
      updateFields(await res.json());
    }
    else{
      alert('Pokémon not found');
    }
  } catch (err) {
    console.log(err);
  }
};

const search = ()=>query(getEl('search-input').value);

getEl('search-button').addEventListener('click', search);
