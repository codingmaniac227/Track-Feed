const USE_API = true

import * as Local from './storage.local'
import * as API from './storage.api'

export const { saveData, loadData, clearData } = USE_API ? API : Local