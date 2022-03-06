import moment from 'moment'

export default [{
  id: '1',
  period: 2,
  note: '',
  year: 5,
  createdAt: 0
}, {
  id: '2',
  period: 8,
  note: '',
  year: 10,
  createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
  id: '3',
  period: 7,
  note: '',
  year: 4,
  createdAt: moment(0).add(4, 'days').valueOf()
}];
