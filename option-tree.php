<?php

$allOptions = json_decode(file_get_contents('options.json'), true);

$tree = array();

findById($_REQUEST['id'], $allOptions, 1, $tree);

function findById($id, $options, $level, &$tree)
{
  foreach ($options as $k=>$v) {
    if ($v['id'] == $id) {
      $tree[$level] = $k;
      return $k;
    }
    else {
      if (!$v['final'])
      {
        $found = findById($id, $v['options'], $level + 1, $tree);
        if ($found) {
          $tree[$level] = $k;
          return $found;
        }
      }
    }
  }
  return false;
}

var_dump($tree);
//var_dump($allOptions[2]['options'][2]['options'][6]['options'][1]);
//var_dump($allOptions[2][2][6][1]);