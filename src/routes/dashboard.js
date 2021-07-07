const express = require('express');
const router = express.Router();
const { jenis, lokasi } = require('../models');
const jsonToTable = require('../helpers/jsonToTable');
const dataLokasi = require('../helpers/dataLokasi');

router.get('/', async (req, res, next) => {
  const publish = (await lokasi.getAll({ publish: true })).length;
  const pending = (await lokasi.getAll({ publish: false })).length;

  res.render('dashboard', { title: 'Dashboard', publish, pending });
});

router.get('/getdata', async (req, res, next) => {
  const getLokasi = await lokasi.getAll({ publish: true });
  res.json(getLokasi);
});

router.get('/kecamatan', async (req, res, next) => {
  const listLokasi = (await lokasi.getList())[2].kecamatan;
  const getLokasi = await lokasi.getAll({ publish: true });
  const kecamatan = listLokasi.map(e => {
    const temp = getLokasi.filter(el => el.kecamatan === e.name);
    e.value = temp.length;
    return e;
  });
  res.json(kecamatan);
});

router.get('/jenis', async (req, res, next) => {
  const listJenis = await jenis.getList();
  const getLokasi = await lokasi.getAll({ publish: true });
  console.log(getLokasi[0].jenis);
  const tempJenis = listJenis.map(e => {
    const temp = getLokasi.filter(el => el.jenis[e.name] === true);
    e.value = temp.length;
    return e;
  });
  res.json(tempJenis);
});

module.exports = router;
