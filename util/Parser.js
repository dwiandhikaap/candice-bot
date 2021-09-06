



function ParseMakul(makulData){
  let result = '';
  for(const makul of makulData){
      const { Kode, NamaMk, JmlSks, JmlPresensiKuliah, IsHadirMID, IsHadirUAS } = makul;

      result += `
      **• ${NamaMk} - ${Kode}** - *${JmlSks} SKS*
      ▸ Presensi  : **${JmlPresensiKuliah}**
      ▸ Hadir UTS : **${IsHadirMID ? 'Ya' : 'Tidak'}**
      ▸ Hadir UAS : **${IsHadirUAS ? 'Ya' : 'Tidak'}**
      `
  }
  return result;
}

function ParseKhs(khsData){
  const {Khs} = khsData;
  let result = '';

  for(const infoKhs of Khs){
      const { Kode, NamaMk, JmlSks, Nilai } = infoKhs;

      result += `
      **• ${NamaMk} - ${Kode}** - *${JmlSks} SKS*
      ▸ Nilai  : **${Nilai}**
      `
  }
  return result;
}

module.exports = {
  ParseMakul : ParseMakul,
  ParseKhs : ParseKhs
}