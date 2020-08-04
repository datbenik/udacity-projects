import { checkDestination, checkTravelDate, checkReturnDate} from './js/inputChecker'
import { performAction } from './js/app'

import './styles/style.scss'

document.getElementById('generate').addEventListener('click', performAction)

export {
    checkDestination,
	checkTravelDate,
	checkReturnDate,
	performAction
}

