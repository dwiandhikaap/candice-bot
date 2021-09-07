function isInvalidYear(year){
  return (!((/^\d{4}\/\d{4}$/i).test(year) && 
  (parseInt(year.split('/')[1]) - parseInt(year.split('/')[0]) === 1) && 
  (parseInt(year.split('/')[0]) <= new Date().getFullYear())
  ))
}

function parseMakul(makulData){
  let result = '';
  if(Object.keys(makulData).length == 0){
    return ':warning:  **No data found!**';
  }

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

function parseKhs(khsData){
  const {Khs} = khsData;
  let result = '';

  if(Object.keys(Khs).length == 0){
    return ':warning:  **No data found!**';
  }

  for(const infoKhs of Khs){
      const { Kode, NamaMk, JmlSks, Nilai } = infoKhs;

      result += `
      **• ${NamaMk} - ${Kode}** - *${JmlSks} SKS*
      ▸ Nilai  : **${Nilai === null ? 'Belum ada data!': Nilai}**
      `
  }
  return result;
}

function parseTranskrip(transkripData, indexRange){
  const { Transkrip } = transkripData;
  let result = '';

  if(Object.keys(Transkrip).length == 0){
    return ':warning:  **No data found!**';
  }

  for(let i = indexRange[0]; i < indexRange[1]; i++){
      const { Kode, NamaMk, JmlSks, Nilai, NamaSifatMk } = Transkrip[i];

      result += `
      **• ${NamaMk} - ${Kode}** - *${JmlSks} SKS*
      ▸ Nilai  : **${Nilai === null ? 'Belum ada data!': Nilai}**
      ▸ Wajib  : **${NamaSifatMk === null ? 'Belum ada data!': NamaSifatMk}**
      `
  }
  
  return result;
}

module.exports = {
  isInvalidYear : isInvalidYear, 
  parseMakul : parseMakul,
  parseKhs : parseKhs,
  parseTranskrip : parseTranskrip
}