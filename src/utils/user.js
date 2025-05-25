// Generates or retrieves a persistent user sub_id
export function getOrCreateUserSubId() {
	let subId = localStorage.getItem('user_sub_id');
	if (!subId) {
		subId = 'user_' + Math.random().toString(36).substring(2, 10);
		localStorage.setItem('user_sub_id', subId);
	}
	return subId;
}

export const USER_SUB_ID = getOrCreateUserSubId();
