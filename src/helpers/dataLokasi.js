const model = require('../models');
const createdAt = new Date();
const updatedAt = new Date();
const dataLokasi = [
  {
    nama: 'RS Hermina Mekarsari',
    waktuOprational: 'senin - jumat',
    kecamatan: 'Cileungsi',
    latitude: '-6.405866',
    longitude: '106.9766478',
  },
  {
    nama: 'klinik prodia',
    waktuOprational: 'senin - jumat',
    kecamatan: 'Bogor Tengah',
    latitude: '-6.610226',
    longitude: '106.7984777',
  },
  {
    nama: 'klinik cito',
    waktuOprational: 'senin - sabtu',
    kecamatan: 'Bogor Utara',
    latitude: '-6.5713528',
    longitude: '106.8062637',
  },
  {
    nama: 'BMC Mayapada',
    waktuOprational: 'senin - minggu',
    kecamatan: 'Bogor Timur',
    latitude: '-6.608053157403827',
    longitude: '106.81112603332522',
  },
  {
    nama: 'Siloam Hospital',
    waktuOprational: 'senin - jumat',
    kecamatan: 'Bogor Tengah',
    latitude: '-6.5956638',
    longitude: '106.8046881',
  },
  {
    nama: 'RS Azra Bogor',
    waktuOprational: 'senin - sabtu',
    kecamatan: 'Bogor Utara',
    latitude: '-6.5795572',
    longitude: '106.8073814',
  },
  {
    nama: 'Bumame Farmasi',
    waktuOprational: 'senin - sabtu',
    kecamatan: 'Bogor Timur',
    latitude: '-6.6342082',
    longitude: '106.8271246',
  },
  {
    nama: 'Klinik Kimia Farma Cilendek',
    waktuOprational: 'senin - sabtu',
    kecamatan: 'Bogor Barat',
    latitude: '-6.5668742',
    longitude: '106.7666789',
  },
  {
    nama: 'RS Hermina Bogor',
    waktuOprational: 'senin - sabtu',
    kecamatan: 'Bogor Barat',
    latitude: '-6.5574884',
    longitude: '106.7737942',
  },
  {
    nama: 'Siloam Clinic Bogor Selatan',
    waktuOprational: 'senin - sabtu',
    kecamatan: 'Bogor Selatan',
    latitude: '-6.610226',
    longitude: '106.7984777',
  },
  {
    nama: 'LabKlin Kimia Farma Bogor',
    waktuOprational: 'senin - sabtu',
    kecamatan: 'Bogor Tengah ',
    latitude: '-6.5713581',
    longitude: '106.8084524',
  },
  {
    nama: 'Klinik Kimia Farma Juanda',
    waktuOprational: 'senin - sabtu',
    kecamatan: 'Bogor Tengah',
    latitude: '-6.5872022',
    longitude: '106.782571',
  },
  {
    nama: 'RS Melania Bogor',
    waktuOprational: 'senin - sabtu',
    kecamatan: 'Bogor Selatan',
    latitude: '-6.6112008',
    longitude: '106.8005453',
  },
  {
    nama: 'RS Mulia Padjajaran',
    waktuOprational: 'senin - sabtu',
    kecamatan: 'Bogor Utara',
    latitude: '-6.57589',
    longitude: '106.80782',
  },
  {
    nama: 'Drive Thru Halodoc',
    waktuOprational: 'senin - minggu',
    kecamatan: 'Bogor Barat',
    latitude: '-6.5842344',
    longitude: '106.7803461',
  },
  {
    nama: 'Siloam Clinic Bogor Barat',
    waktuOprational: 'senin - sabtu',
    kecamatan: 'Bogor Barat',
    latitude: '-6.5720882',
    longitude: '106.7533642',
  },
  {
    nama: 'RS Juliana Bogor',
    waktuOprational: 'senin - minggu',
    kecamatan: 'Bogor Timur',
    latitude: '-6.6282871',
    longitude: '106.8235908',
  },
  {
    nama: 'Klinik Kimia Farma Kebon Pedes',
    waktuOprational: 'senin - sabtu',
    kecamatan: 'Tanah Sareal',
    latitude: '-6.5682988',
    longitude: '106.7991922',
  },
  {
    nama: 'Klinik Pintar IDI',
    waktuOprational: 'senin - minggu',
    kecamatan: 'Bogor Tengah',
    latitude: '-6.5928601',
    longitude: '106.8146068',
  },
  {
    nama: 'Adikaras Klinik KIS',
    waktuOprational: 'senin - sabtu',
    kecamatan: 'Babakan Madang',
    latitude: '-6.5308143',
    longitude: '106.8524179',
  },
  {
    nama: 'Klinik Annasr III',
    waktuOprational: 'senin - minggu',
    kecamatan: 'Gunung Sindur',
    latitude: '-6.3508611',
    longitude: '106.6721313',
  },
  {
    nama: 'RS EMC Sentul',
    waktuOprational: 'senin - minggu',
    kecamatan: 'Babakan Madang',
    latitude: '-6.5672536',
    longitude: '106.8537562',
  },
  {
    nama: 'RS FMC Bogor',
    waktuOprational: 'senin - minggu',
    kecamatan: 'Sukaraja',
    latitude: '-6.5341618',
    longitude: '106.8276777',
  },
  {
    nama: 'RS Pena 98',
    waktuOprational: 'senin - jumat',
    kecamatan: 'Gunung Sindur',
    latitude: '-6.3801941',
    longitude: '106.6890245',
  },
  {
    nama: 'LabKlin Arkatama',
    waktuOprational: 'senin - minggu',
    kecamatan: 'Cibinong',
    latitude: '-6.4855664',
    longitude: '106.8397117',
  },
  {
    nama: 'Klinik Cimanggis Jaya',
    waktuOprational: 'senin - minggu',
    kecamatan: 'Bojong Gede',
    latitude: '-6.5022764',
    longitude: '106.7838635',
  },
  {
    nama: 'Klinik Kimia Farma Ya Rahmah',
    waktuOprational: 'senin - jumat',
    kecamatan: 'Parung',
    latitude: '-6.4187764',
    longitude: '106.7321331',
  },
  {
    nama: 'Klinik Kimia Farma Cileungsi',
    waktuOprational: 'senin - jumat',
    kecamatan: 'Cileungsi',
    latitude: '-6.3920517',
    longitude: '106.9572895',
  },
  {
    nama: 'Klinik Kimia Farma Narogong',
    waktuOprational: 'senin - jumat',
    kecamatan: 'Cileungsi',
    latitude: '-6.3170826',
    longitude: '106.9622995',
  },
  {
    nama: 'RS Permata Jonggol',
    waktuOprational: 'senin - minggu',
    kecamatan: 'Jonggol',
    latitude: '-6.4375682',
    longitude: '107.0519134',
  },
  {
    nama: 'RS Mitra Keluarga Bina Husada',
    waktuOprational: 'senin - sabtu',
    kecamatan: 'Cibinong',
    latitude: '-6.473584',
    longitude: '106.8611589',
  },
];
const dataJenis = [
  {
    swab: '1',
    pcr: '1',
  },
  {
    swab: '1',
    pcr: '1',
  },
  {
    pcr: '1',
    swab_antigen: '1',
    sars_cov_2: '1',
  },
  {
    rapid: '1',
    swab: '1',
    pcr: '1',
  },
  {
    rapid: '1',
    swab: '1',
    pcr: '1',
    swab_antigen: '1',
    sars_cov_2: '1',
  },
  {
    rapid: '1',
    swab: '1',
    pcr: '1',
    swab_antigen: '1',
    sars_cov_2: '1',
  },
  {
    swab: '1',
    pcr: '1',
    swab_antigen: '1',
  },
  {
    swab: '1',
    pcr: '1',
  },
  {
    rapid: '1',
    swab: '1',
    pcr: '1',
  },
  {
    swab: '1',
    pcr: '1',
  },
  {
    rapid: '1',
    swab: '1',
    pcr: '1',
    swab_antigen: '1',
  },
  {
    rapid: '1',
    swab: '1',
    pcr: '1',
    swab_antigen: '1',
  },
  {
    rapid: '1',
    swab: '1',
    pcr: '1',
  },
  {
    rapid: '1',
    swab: '1',
    pcr: '1',
  },
  {
    swab: '1',
    pcr: '1',
    swab_antigen: '1',
  },
  {
    rapid: '1',
  },
  {
    rapid: '1',
    swab: '1',
    pcr: '1',
  },
  {
    rapid: '1',
    swab: '1',
    pcr: '1',
    swab_antigen: '1',
  },
  {
    swab_antigen: '1',
  },
  {
    rapid: '1',
    swab: '1',
    pcr: '1',
    swab_antigen: '1',
  },
  {
    swab: '1',
  },
  {
    swab: '1',
  },
  {
    swab: '1',
    swab_antigen: '1',
  },
  {
    swab: '1',
    pcr: '1',
  },
  {
    swab: '1',
    pcr: '1',
  },
  {
    swab: '1',
    pcr: '1',
  },
  {
    rapid: '1',
    swab: '1',
    pcr: '1',
    swab_antigen: '1',
  },
  {
    rapid: '1',
  },
  {
    rapid: '1',
  },
  {
    rapid: '1',
  },
  {
    swab: '1',
    pcr: '1',
  },
];

const saveData = async () => {
  dataJenis.forEach(async e => {
    await model.jenis.create({
      swab: e.swab ? true : false,
      rapid: e.rapid ? true : false,
      pcr: e.pcr ? true : false,
      swab_antigen: e.swab_antigen ? true : false,
      sars_cov_2: e.sars_cov_2 ? true : false,
    });
  });
  dataLokasi.forEach(async (e, i) => {
    await model.lokasi.create({
      name: e.nama,
      jenis_id: i + 1,
      waktuOprational: e.waktuOprational,
      kecamatan: e.kecamatan,
      latitude: e.latitude,
      longitude: e.longitude,
      publish: true,
      createdAt,
      updatedAt,
    });
  });
};

module.exports = saveData;
