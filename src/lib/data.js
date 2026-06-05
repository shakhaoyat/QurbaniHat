export async function getData() {
      const res = await fetch('https://qurbani-hat-server-u4yt.onrender.com/animal');
      const data = await res.json();
      return data;
}