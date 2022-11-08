module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      number: String,
      is_called: Boolean,
      service: Object,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Queue = mongoose.model("queue", schema);
  return Queue;
};
