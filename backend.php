<?
	include('class_lunchregistration.php');
	
	//CSV filename for storing the lunch history
	$constCSVfile = "lunchhistory.csv"; 
	
	//initialize lunchregistration object and load LunchHistory
	$lunchregistration = new lunchregistration;
	$lunchregistration->loadLunchHistoryCSV($constCSVfile);

	//Determine page action based on GET parameter "a".
	switch($_GET['a']) {
		case 'getlunchday';
			//Create today's JSON lunch information
			$strOutput =  $lunchregistration->createTodayJSON($_GET['day']);
		break;
		case 'setlunchday';     
			//Receive and process updated JSON data via $_POST['users'. 
			$strOutput =  $lunchregistration->updateLunchHistory($_POST['users'], $_GET['day']);
			$lunchregistration->saveLunchHistoryCSV($constCSVfile);
		break;
		default;
			//The default behaviour is to create the (HTML) kunch history overview.
			$strOutput = $lunchregistration->displayLunchHistory();
		break;
	} //end switch

	//Display HTML or JSON data on screen
	echo $strOutput;
?>
