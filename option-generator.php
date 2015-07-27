<?php
/*
 * Generates dummy options for select boxes
 */

$allOptions = array();
$id = 1;

$allOptions = fillOptions($id, 1, 5);

echo json_encode($allOptions);

function fillOptions(&$id, $level, $maxLevel)
{
  $max = rand(1, 9);
  $result = array();
  for ($i=1;$i<=$max;$i++) {
    $option = array();
    $option['id'] = $id++;
    $option['name'] = 'Level ' . $level . ' Option ' . $i;
    if ($level < $maxLevel)
      $option['final'] = rand(0,1);
    else
      $option['final'] = 1;
    if (!$option['final'])
      $option['options'] = fillOptions($id, $level + 1, $maxLevel);
    $result[$i] = $option;
  }
  return $result;
}
