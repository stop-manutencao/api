function get(req, res) {
  const data = {
    status: 'OK!',
    params: req.params,
    body: req.body
  }

  return res.json(data)
}

export default {
  get
}
