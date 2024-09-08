export default function validateStage(values) {
	let errors = {};
	if (!values.topic_name) {
		errors.topic_name = "Topic name is required";
	}
    return errors;
}
