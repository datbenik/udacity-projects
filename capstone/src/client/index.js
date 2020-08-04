import { checkDestination, checkDate} from './js/inputChecker'
import { performAction } from './js/app'

import './styles/style.scss'

document.getElementById('generate').addEventListener('click', performAction)

export {
    checkDestination,
	checkDate,
	performAction
}

