export default {
  allMessagesFromDate(datetime) {
    return `/messages?createdAt_gte=${datetime}`
  },
  get createMessage() {
    return '/messages';
  },
}
