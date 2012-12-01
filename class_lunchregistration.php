<?
/***********************************************************************
Array object(s):
	$arLunchHistory (Array)

Public method(s):
	public function loadLunchHistoryCSV($filename)
	public function saveLunchHistoryCSV($filename)
	public function updateLunchHistory($usersJSON, $today)
	public function createTodayJSON($day)
	public function displayLunchHistory()

Private method(s):
	private function getDefaultUsers($folder)
************************************************************************/


class lunchregistration { 
	var $arLunchHistory; //array to store lunch history
	
	
	/***********************************************************************
	Input :  filename (string)
	Output:  $this->arLunchHistory (Array)
	Descr :  Load CSV file and update object array.
	         CSV format:    TIMESTAMP(YYYYMMDD), STRING (USERNAME=0|1|NULL;USERNAME=0|1|NULL;USERNAME=0|1|NULL; etc..)
						    Example: 20121116,"foo=0;bar=1;derp="
			 Array format: 	/***********************************************************************
	Input :  filename (string)
	Output:  $this->arLunchHistory (Array)
	Descr :  Save $this->arLunchHistory contents to CSV file.
	         CSV format:    TIMESTAMP(YYYYMMDD), STRING (USERNAME=0|1|NULL;USERNAME=0|1|NULL;USERNAME=0|1|NULL; etc..)
						    Example: 20121116,"foo=0;bar=1;derp="
			 Array format: [20121116] => Array
								(
									[foo] => 0
									[bar] => 1
									[derp] => 
								)
	***********************************************************************/
	public function loadLunchHistoryCSV($filename) { 
		if (($handle = fopen($filename, "r")) !== FALSE) {
			while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) { //$data[0] = TIMESTAMP, $data[1] = STRING
				$users = explode(";" , $data[1]);     //split STRING per individual user.
				foreach ($users as $key => $value) {  //Loop through all users.
					$user_values = explode("=" , $value); //split each user into a user name and the lunch setting/value
					$this->arLunchHistory[ $data[0] ] [ trim($user_values[0]) ] = trim($user_values[1]); // $user_values[0] = username, $user_values[1] = lunch setting/value (1 = YES, 0|null = NO)
				}//end foreach
			} //end while
			fclose($handle);
		} //end if
	} //end public

	
	/***********************************************************************
	Input :  filename (string)
	Output:  $this->arLunchHistory (Array)
	Descr :  Save $this->arLunchHistory contents to CSV file.
	         CSV format:    TIMESTAMP(YYYYMMDD), STRING (USERNAME=0|1|NULL;USERNAME=0|1|NULL;USERNAME=0|1|NULL; etc..)
						    Example: 20121116,"foo=0;bar=1;derp="
			 Array format: [20121116] => Array
								(
									[foo] => 0
									[bar] => 1
									[derp] => 
								)
	***********************************************************************/
	public function saveLunchHistoryCSV($filename) { 
		if (($handle = fopen($filename, "w")) !== FALSE) {
			foreach ($this->arLunchHistory as $key_day => $value_day) {
				$strUser = "";
				$i=0;
				foreach ($value_day as $key_user => $value_user) {
					if ($i>0) $strUser .=";";
					$strUser .= $key_user . "=" . $value_user;
					$i++;
				} //end foreach
				fputcsv($handle, array($key_day, $strUser));
			} //end foreach
			fclose($handle);
		} //end if
	} //end public	
	

	/***********************************************************************
	Input :  $usersJSON = JSON string  ( eg: 'users:{"foo":"1","bar":"1","derp":"1"}' )
			 $today     = YYYYMMDD (timestamp string)
	Output:  Updated $this->arLunchHistory
	         JSON response string (array "succes => true|false, message => description")
	Descr :  This will receive the today's lunch registration JSON and update the Object array
	***********************************************************************/
	public function updateLunchHistory($usersJSON, $today) { 
		if (strlen($usersJSON)>0) {
			$arUsers = json_decode($usersJSON, true);
			if (is_array($arUsers)) {
				foreach ($arUsers as $key => $value) {
					$this->arLunchHistory[$today][$key] = $value;
				} //end foreach
				$data = array('success'=> true,'message'=>'JSON data succesfull received.');
				return json_encode($data);
			} else {
				$data = array('success'=> false,'message'=>'JSON data failed to receive.');
				return json_encode($data);
			}
		}
	} //end public
	

	
	/***********************************************************************
	Input :  Subfolder "users" contents. 
	Output:  Array (
				foo  => null
				bar  => null
				derp => null
			 )
	Descr :  This will loop through the subfolder "users" to look for "jpg" images.
	         The ".jpg" extention will be stripped. The remaining filename is used as username
	***********************************************************************/
	private function getDefaultUsers($folder) { 
		$arUsers='';
		if ($handle = opendir($folder)) {
			while (false !== ($entry = readdir($handle))) { //loop through folder "users"
				if (strpos($entry, '.jpg',1)) { //look for ".jpg" files.
					$user = explode(".",$entry); //strip ".jpg" extention.
                    $arUsers[ $user[0] ] = null; //store username (as array key)
                } //end if
			} //end while
			closedir($handle);
		} //end if
		return $arUsers;
	} //end public
	
	
	/***********************************************************************
	Input :  $day = YYYYMMDD timestamp string
	Output:  JSON string with todays lunch information
	Descr :  If today's lunch has already been registered,
	            then create a JSON string based on the stored Lunch history
			    else create a JSON string based on the available users (with default empty values)
	***********************************************************************/
	public function createTodayJSON($day) { 
		if (isset($this->arLunchHistory[$day])) {
			return json_encode($this->arLunchHistory[$day]);
		} else {
			return json_encode($this->getDefaultUsers('users'));
		}
	} //end public

	
	
	/***********************************************************************
	Input :  $this->arLunchHistory 
	Output:  HTML output. 
	Descr :  Create lunchhistory overview to display on screen.
	***********************************************************************/
	public function displayLunchHistory() { 
		$strOutput='';
		if (is_array($this->arLunchHistory)) {
			reset($this->arLunchHistory);
			foreach ($this->arLunchHistory as $key => $value) {
				$year = substr($key,0,4);
				$month = substr($key,4,2);
				$day = substr($key,6,2);
				if (is_array($value)) {
					reset($value);
					arsort($value);
					foreach ($value as $key_user => $value_user) {
						if ($value_user==1) {
							$arMontly[$year][date("F", mktime(0, 0, 0, $month, $day, $year) )][$key_user] ++;
							$arYearly[$year][$key_user] ++;
						}
					} //end if
					arsort($arYearly);
					arsort($arYearly[$year]);
				}	
			}//end foreach
		} //end if
		if (is_array($arYearly)) {
			foreach ($arYearly as $key => $value) {
				$strOutput.='<br/><hr/><table border="1"><tr><td valign="top" width="100"><b>'.$key.' </b></td>';
				foreach ($value as $key_users => $value_users) {
					$strOutput.='<td width="100"><center><b>'.$key_users.'</b><br/>'.$value_users.'<center></td>';
				} //end foreach
				$strOutput.='</tr></table>';
				if (is_array($arMontly[$key])) {
					foreach ($arMontly[$key] as $keyMontly => $valueMontly) {
						$strOutput.='<table border="1"><tr><td valign="top" width="100"><b>' . $keyMontly . '</b></td>';
						foreach ($valueMontly as $keyMontly_users => $valueMontly_users) {
							$strOutput.='<td width="100"><center><b>'.$keyMontly_users.'</b><br/>'.$valueMontly_users.'<center></td>';
						}
						$strOutput.='</tr></table>';
					} //end foreach
				}//end if	
			} //end foreach
		} //end if
		return $strOutput;
	} //end public	
	
	
	
} //end class
?>
