<?php
/*
 * Returns options for a select box
 */

echo "started!!!!";
header("Access-Control-Allow-Origin: *");

$allOptions = json_decode(file_get_contents('http://ng-chained-selects.appspot.com/options.json'), true);

$result = array();
// option.php?mode=tree&id=20
if (isset($_REQUEST['mode'])) {
    if (!isset($_REQUEST['id']) || !$_REQUEST['id'])
    {
        $result[1]['options'] = returnLevelOptions($allOptions);
        die (json_encode($result));
    }
    $tree = array();
    findById($_REQUEST['id'], $allOptions, 1, $tree);
    ksort($tree);
    $result = array();
    $target = $allOptions;
    for ($i=1; $i<=count($tree); $i++) {
        $result[$i]['options'] = returnLevelOptions($target);
        $result[$i]['selected'] = $result[$i]['options'][$tree[$i]];
        if ($i<count($tree))
            $target = $target[$tree[$i]]['options'];

    }

    die (json_encode($result));

}


// option.php?id=20
if (isset($_REQUEST['id']))
{
    if (!$_REQUEST['id'])
    {
        $result = returnLevelOptions($allOptions);
        die (json_encode($result));
    }

    $tree = array();
    findById($_REQUEST['id'], $allOptions, 1, $tree);
    ksort($tree);
    $target = $allOptions;
    for ($i=1; $i<count($tree); $i++) {
        $target = $target[$tree[$i]]['options'];
    }
    $result = returnLevelOptions($target);
    die (json_encode($result));
}

function returnLevelOptions($options)
{
    $result = array();
    foreach ($options as $k=>$v)
    {
        $row = $v;
        unset($row['options']);
        $result[] = $row;
    }
    return $result;
}

findById($_REQUEST['id'], $allOptions, 1, $tree);

function findById($id, $options, $level, &$tree)
{
    foreach ($options as $k => $v)
    {
        if ($v['id'] == $id)
        {
            $tree[$level] = $k;
            return $k;
        } else
        {
            if (!$v['final'])
            {
                $found = findById($id, $v['options'], $level + 1, $tree);
                if ($found !== false)
                {
                    $tree[$level] = $k;
                    return $found;
                }
            }
        }
    }
    return false;
}
