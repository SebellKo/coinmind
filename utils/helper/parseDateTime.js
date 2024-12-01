function parseDateTime(date, time) {
  return new Date(`${date}T${time}`);
}

module.exports = { parseDateTime };
