const express = require('express');
const router = express.Router();
const { jenis, lokasi } = require('../models');
const jsonToTable = require('../helpers/jsonToTable');
const dataLokasi = require('../helpers/dataLokasi');
const middleware = require('../helpers/middleware');
const rp = require('../helpers/formatRp');

router.get('/', (req, res, next) => {
  res.render('lokasi/index', { title: 'Lokasi' });
});

router.get('/pending', middleware, (req, res, next) => {
  res.render('lokasi/pending', { title: 'Pending' });
});

router.get('/table', async (req, res, next) => {
  const getLokasi = await lokasi.getAll({ publish: true });
  const filter = getLokasi.map(e => {
    const check = '<i class="bi bi-check"></i>';
    const unCheck = '<i class="bi bi-x"></i>';
    const biaya = e.biaya ? rp(e.biaya) : rp(0);
    return {
      id: e.id,
      nama: e.name,
      alamat: e.alamat,
      kecamatan: e.kecamatan,
      biaya,
      waktu: e.waktuOprational,
      rapid: e.jenis.rapid ? check : unCheck,
      swab: e.jenis.swab ? check : unCheck,
      'swab antigen': e.jenis.swab_antigen ? check : unCheck,
      'sars cov2': e.jenis.sars_cov2 ? check : unCheck,
    };
  });
  res.json(jsonToTable(filter));
});

router.get('/table/pending', middleware, async (req, res, next) => {
  const getLokasi = await lokasi.getAll({ publish: false });
  const filter = getLokasi.map(e => {
    const check = '<i class="bi bi-check"></i>';
    const unCheck = '<i class="bi bi-x"></i>';
    return {
      id: e.id,
      name: e.name,
      alamat: e.alamat,
      kecamatan: e.kecamatan,
      biaya: e.biaya,
      waktu: e.waktuOprational,
      rapid: e.jenis.rapid ? check : unCheck,
      swab: e.jenis.swab ? check : unCheck,
      'swab antigen': e.jenis.swab_antigen ? check : unCheck,
      'sars cov2': e.jenis.sars_cov2 ? check : unCheck,
    };
  });
  res.json(jsonToTable(filter));
});

router.post('/', async (req, res, next) => {
  const {
    name,
    alamat,
    waktuOprational,
    kecamatan,
    biaya,
    latitude,
    longitude,
    rapid,
    swab,
    pcr,
    swab_antigen,
    sars_cov_2,
  } = req.body;
  const foto = req.file && `/upload/${req.file.filename}`;
  const findLokasi = await lokasi.findOne({ where: { name } });
  if (findLokasi) {
    req.flash('error', 'Nama Tidak Boleh Sama');
    return res.redirect('/lokasi');
  }
  const createJenis = await jenis.create({
    swab: swab ? true : false,
    rapid: rapid ? true : false,
    pcr: pcr ? true : false,
    swab_antigen: swab_antigen ? true : false,
    sars_cov_2: sars_cov_2 ? true : false,
  });

  await lokasi.create({
    name,
    jenis_id: createJenis.id,
    alamat,
    foto,
    waktuOprational,
    kecamatan,
    biaya,
    latitude,
    longitude,
  });
  req.flash('success', 'Data Berhasil ditambahkan, Menunggu Konfirmasi Admin');
  return res.redirect('/lokasi');
});

router.post('/:id', middleware, async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    alamat,
    waktuOprational,
    kecamatan,
    biaya,
    latitude,
    longitude,
    rapid,
    swab,
    pcr,
    swab_antigen,
    sars_cov_2,
  } = req.body;
  const foto = req.file && `/upload/${req.file.filename}`;

  const findLokasi = await lokasi.findByPk(id);
  if (!findLokasi) {
    req.flash('error', 'Terjadi Kesalahan');
    return res.redirect('/lokasi');
  }
  const findJenis = await jenis.findByPk(findLokasi.jenis_id);
  await findJenis.update({
    swab: swab ? true : false,
    rapid: rapid ? true : false,
    pcr: pcr ? true : false,
    swab_antigen: swab_antigen ? true : false,
    sars_cov_2: sars_cov_2 ? true : false,
  });
  await findLokasi.update({
    name,
    jenis_id: findLokasi.jenis_id,
    alamat,
    foto,
    waktuOprational,
    kecamatan,
    biaya,
    latitude,
    longitude,
  });
  req.flash('success', 'Data Berhasil diubah');
  return res.redirect('/lokasi');
});

router.get('/form', async (req, res, next) => {
  const dataJenis = await jenis.getList();
  const dataLokasi = await lokasi.getList();
  res.render('lokasi/form', { title: 'Lokasi', action: '/lokasi', dataJenis, dataLokasi });
});

router.get('/form/:id', middleware, async (req, res, next) => {
  const { id } = req.params;
  const getDataLokasi = await lokasi.getOne({ id });
  const dataJenis = (await jenis.getList()).map(e => {
    const jenis = getDataLokasi.jenis.dataValues;
    const jenisKey = Object.keys(jenis);
    jenisKey.map(el => {
      if (e.name === el) {
        e.value = jenis[e.name];
        return e;
      }
    });
    return e;
  });
  const dataLokasi = (await lokasi.getList()).map(e => {
    const lokasi = getDataLokasi.dataValues;
    const lokasiKey = Object.keys(lokasi);
    lokasiKey.map(el => {
      if (e.name === el) {
        e.value = lokasi[e.name];
        if (e.name === 'kecamatan') {
          const kecamatan = e.kecamatan.find(kec => kec.name == lokasi[e.name]);
          kecamatan.value = true;
        }
        return e;
      }
    });
    return e;
  });
  res.render('lokasi/form', { title: 'Lokasi', action: `/lokasi/${id}`, dataJenis, dataLokasi });
});

router.get('/delete/:id', middleware, async (req, res, next) => {
  const { id } = req.params;
  const findLokasi = await lokasi.findByPk(id);
  const findJenis = await jenis.findByPk(findLokasi.jenis_id);
  await findLokasi.destroy();
  await findJenis.destroy();
  req.flash('success', 'Data Berhasil Dihapus');
  return res.redirect('/lokasi');
});

router.get('/detail/:id', async (req, res, next) => {
  const { id } = req.params;
  const findLokasi = await lokasi.findByPk(id);
  const findJenis = await jenis.findByPk(findLokasi.jenis_id);
  const biaya = findLokasi.biaya ? rp(findLokasi.biaya) : 0;
  const swab = findJenis.swab ? 'swab' : '';
  const rapid = findJenis.rapid ? 'rapid' : '';
  const pcr = findJenis.pcr ? 'pcr' : '';
  const swab_antigen = findJenis.swab_antigen ? 'swab_antigen' : '';
  const sars_cov_2 = findJenis.sars_cov_2 ? 'sars_cov_2' : '';
  const publish = findLokasi.publish;
  const tempJenis = `${swab} ${rapid} ${pcr} ${swab_antigen} ${sars_cov_2}`;
  return res.render('lokasi/detail', { title: 'Lokasi', findLokasi, tempJenis, publish, biaya });
});

router.get('/mimgrasiDataBase', middleware, async (req, res, next) => {
  await dataLokasi();
  return res.json('ok');
});

module.exports = router;
