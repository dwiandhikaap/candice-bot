function ParseMakul(dataMhs){
  let result = '';
  for(const makul of dataMhs){
      const { Kode, NamaMk, JmlSks, JmlPresensiKuliah, IsHadirMID, IsHadirUAS } = makul;

      result += `
      **• ${NamaMk} - ${Kode}**
      ▸ Presensi  : ${JmlPresensiKuliah} - _**${JmlSks} SKS**_
      ▸ Hadir UTS : **${IsHadirMID ? 'Ya' : 'Tidak'}**
      ▸ Hadir UAS : **${IsHadirUAS ? 'Ya' : 'Tidak'}**
      `
  }
  return result;
}

module.exports = {
  ParseMakul : ParseMakul
}